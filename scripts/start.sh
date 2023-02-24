#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then
  set -o xtrace
fi
source "${BASH_SOURCE%/*}/common.sh"

ROOT_FOLDER="${PWD}"

# Cleanup and ensure environment
ensure_linux
ensure_pwd
ensure_root
clean_logs

### --------------------------------
### Pre-configuration
### --------------------------------
"${ROOT_FOLDER}/scripts/configure.sh"

STATE_FOLDER="${ROOT_FOLDER}/state"
# Create seed file with cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
if [[ ! -f "${STATE_FOLDER}/seed" ]]; then
  echo "Generating seed..."
  if ! tr </dev/urandom -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1 >"${STATE_FOLDER}/seed"; then
    echo "Created seed file..."
  fi
fi

### --------------------------------
### General variables
### --------------------------------
DEFAULT_TZ="Etc\/UTC"
TZ="$(timedatectl | grep "Time zone" | awk '{print $3}' | sed 's/\//\\\//g')"
if [[ -z "$TZ" ]]; then
  TZ="$DEFAULT_TZ"
fi
NGINX_PORT=80
NGINX_PORT_SSL=443
DOMAIN=tipi.localhost
SED_ROOT_FOLDER="$(echo "$ROOT_FOLDER" | sed 's/\//\\\//g')"
DNS_IP="9.9.9.9" # Default to Quad9 DNS
ARCHITECTURE="$(uname -m)"
apps_repository="https://github.com/meienberger/runtipi-appstore"
REPO_ID="$("${ROOT_FOLDER}"/scripts/git.sh get_hash ${apps_repository})"
APPS_REPOSITORY_ESCAPED="$(echo ${apps_repository} | sed 's/\//\\\//g')"
JWT_SECRET=$(derive_entropy "jwt")
POSTGRES_PASSWORD=$(derive_entropy "postgres")
POSTGRES_USERNAME=tipi
POSTGRES_DBNAME=tipi
POSTGRES_PORT=5432
POSTGRES_HOST=tipi-db
TIPI_VERSION=$(get_json_field "${ROOT_FOLDER}/package.json" version)
storage_path="${ROOT_FOLDER}"
STORAGE_PATH_ESCAPED="$(echo "${storage_path}" | sed 's/\//\\\//g')"
REDIS_HOST=tipi-redis
INTERNAL_IP=

if [[ "$ARCHITECTURE" == "aarch64" ]]; then
  ARCHITECTURE="arm64"
elif [[ "$ARCHITECTURE" == "armv7"* || "$ARCHITECTURE" == "armv8"* ]]; then
  ARCHITECTURE="arm"
elif [[ "$ARCHITECTURE" == "x86_64" ]]; then
  ARCHITECTURE="amd64"
fi

# If none of the above conditions are met, the architecture is not supported
if [[ "$ARCHITECTURE" != "arm64" ]] && [[ "$ARCHITECTURE" != "arm" ]] && [[ "$ARCHITECTURE" != "amd64" ]]; then
  echo "Architecture ${ARCHITECTURE} not supported!"
  exit 1
fi

### --------------------------------
### CLI arguments
### --------------------------------
while [ -n "${1-}" ]; do
  case "$1" in
  --rc) rc="true" ;;
  --ci) ci="true" ;;
  --port)
    port="${2-}"

    if [[ "${port}" =~ ^[0-9]+$ ]]; then
      NGINX_PORT="${port}"
    else
      echo "--port must be a number"
      exit 1
    fi
    shift
    ;;
  --ssl-port)
    ssl_port="${2-}"

    if [[ "${ssl_port}" =~ ^[0-9]+$ ]]; then
      NGINX_PORT_SSL="${ssl_port}"
    else
      echo "--ssl-port must be a number"
      exit 1
    fi
    shift
    ;;
  --domain)
    domain="${2-}"

    if [[ "${domain}" =~ ^[a-zA-Z0-9.-]+$ ]]; then
      DOMAIN="${domain}"
    else
      echo "--domain must be a valid domain"
      exit 1
    fi
    shift
    ;;
  --listen-ip)
    listen_ip="${2-}"

    if [[ "${listen_ip}" =~ ^[a-fA-F0-9.:]+$ ]]; then
      INTERNAL_IP="${listen_ip}"
    else
      echo "--listen-ip must be a valid IP address"
      exit 1
    fi
    shift
    ;;
  --)
    shift # The double dash makes them parameters
    break
    ;;
  *) echo "Option $1 not recognized" && exit 1 ;;
  esac
  shift
done

if [[ -z "${INTERNAL_IP:-}" ]]; then
  network_interface="$(ip route | grep default | awk '{print $5}' | uniq)"
  network_interface_count=$(echo "$network_interface" | wc -l)

  if [[ "$network_interface_count" -eq 0 ]]; then
    echo "No network interface found!"
    exit 1
  elif [[ "$network_interface_count" -gt 1 ]]; then
    echo "Found multiple network interfaces. Please select one of the following interfaces:"
    echo "$network_interface"
    while true; do
      read -rp "> " USER_NETWORK_INTERFACE
      if echo "$network_interface" | grep -x "$USER_NETWORK_INTERFACE"; then
        network_interface="$USER_NETWORK_INTERFACE"
        break
      else
        echo "Please select one of the interfaces above. (CTRL+C to abort)"
      fi
    done
  fi

  INTERNAL_IP="$(ip addr show "${network_interface}" | grep "inet " | awk '{print $2}' | cut -d/ -f1)"
  internal_ip_count=$(echo "$INTERNAL_IP" | wc -l)

  if [[ "$internal_ip_count" -eq 0 ]]; then
    echo "No IP address found for network interface ${network_interface}! Set the IP address manually with --listen-ip or with the listenIp field in settings.json."
    exit 1
  elif [[ "$internal_ip_count" -gt 1 ]]; then
    echo "Found multiple IP addresses for network interface ${network_interface}. Please select one of the following IP addresses:"
    echo "$INTERNAL_IP"
    while true; do
      read -rp "> " USER_INTERNAL_IP
      if echo "$INTERNAL_IP" | grep -x "$USER_INTERNAL_IP"; then
        INTERNAL_IP="$USER_INTERNAL_IP"
        break
      else
        echo "Please select one of the IP addresses above. (CTRL+C to abort)"
      fi
    done
  fi
fi

# If port is not 80 and domain is not tipi.localhost, we exit
if [[ "${NGINX_PORT}" != "80" ]] && [[ "${DOMAIN}" != "tipi.localhost" ]]; then
  echo "Using a custom domain with a custom port is not supported"
  exit 1
fi

### --------------------------------
### Watcher and system-info
### --------------------------------
echo "Running system-info.sh..."
"${ROOT_FOLDER}/scripts/system-info.sh"

kill_watcher
"${ROOT_FOLDER}/scripts/watcher.sh" &

### --------------------------------
### settings.json overrides
### --------------------------------
echo "Generating config files..."
# Override vars with values from settings.json
if [[ -f "${STATE_FOLDER}/settings.json" ]]; then

  # If dnsIp is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" dnsIp)" != "null" ]]; then
    DNS_IP=$(get_json_field "${STATE_FOLDER}/settings.json" dnsIp)
  fi

  # If domain is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" domain)" != "null" ]]; then
    DOMAIN=$(get_json_field "${STATE_FOLDER}/settings.json" domain)
  fi

  # If appsRepoUrl is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" appsRepoUrl)" != "null" ]]; then
    apps_repository=$(get_json_field "${STATE_FOLDER}/settings.json" appsRepoUrl)
    APPS_REPOSITORY_ESCAPED="$(echo "${apps_repository}" | sed 's/\//\\\//g')"
    REPO_ID="$("${ROOT_FOLDER}"/scripts/git.sh get_hash "${apps_repository}")"
  fi

  # If port is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" port)" != "null" ]]; then
    NGINX_PORT=$(get_json_field "${STATE_FOLDER}/settings.json" port)
  fi

  # If sslPort is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" sslPort)" != "null" ]]; then
    NGINX_PORT_SSL=$(get_json_field "${STATE_FOLDER}/settings.json" sslPort)
  fi

  # If listenIp is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" listenIp)" != "null" ]]; then
    INTERNAL_IP=$(get_json_field "${STATE_FOLDER}/settings.json" listenIp)
  fi

  # If storagePath is set in settings.json, use it
  if [[ "$(get_json_field "${STATE_FOLDER}/settings.json" storagePath)" != "null" ]]; then
    storage_path="$(get_json_field "${STATE_FOLDER}/settings.json" storagePath)"
    STORAGE_PATH_ESCAPED="$(echo "${storage_path}" | sed 's/\//\\\//g')"
  fi
fi

new_values="DOMAIN=${DOMAIN}\nDNS_IP=${DNS_IP}\nAPPS_REPOSITORY=${APPS_REPOSITORY_ESCAPED}\nREPO_ID=${REPO_ID}\nNGINX_PORT=${NGINX_PORT}\nNGINX_PORT_SSL=${NGINX_PORT_SSL}\nINTERNAL_IP=${INTERNAL_IP}\nSTORAGE_PATH=${STORAGE_PATH_ESCAPED}\nTZ=${TZ}\nJWT_SECRET=${JWT_SECRET}\nROOT_FOLDER=${SED_ROOT_FOLDER}\nTIPI_VERSION=${TIPI_VERSION}\nARCHITECTURE=${ARCHITECTURE}"
write_log "Final values: \n${new_values}"

### --------------------------------
### env file generation
### --------------------------------
ENV_FILE=$(mktemp)
[[ -f "${ROOT_FOLDER}/.env" ]] && rm -f "${ROOT_FOLDER}/.env"
[[ -f "$ROOT_FOLDER/templates/env-sample" ]] && cp "$ROOT_FOLDER/templates/env-sample" "$ENV_FILE"

for template in ${ENV_FILE}; do
  sed -i "s/<dns_ip>/${DNS_IP}/g" "${template}"
  sed -i "s/<internal_ip>/${INTERNAL_IP}/g" "${template}"
  sed -i "s/<tz>/${TZ}/g" "${template}"
  sed -i "s/<jwt_secret>/${JWT_SECRET}/g" "${template}"
  sed -i "s/<root_folder>/${SED_ROOT_FOLDER}/g" "${template}"
  sed -i "s/<tipi_version>/${TIPI_VERSION}/g" "${template}"
  sed -i "s/<architecture>/${ARCHITECTURE}/g" "${template}"
  sed -i "s/<nginx_port>/${NGINX_PORT}/g" "${template}"
  sed -i "s/<nginx_port_ssl>/${NGINX_PORT_SSL}/g" "${template}"
  sed -i "s/<postgres_password>/${POSTGRES_PASSWORD}/g" "${template}"
  sed -i "s/<postgres_username>/${POSTGRES_USERNAME}/g" "${template}"
  sed -i "s/<postgres_dbname>/${POSTGRES_DBNAME}/g" "${template}"
  sed -i "s/<postgres_port>/${POSTGRES_PORT}/g" "${template}"
  sed -i "s/<postgres_host>/${POSTGRES_HOST}/g" "${template}"
  sed -i "s/<apps_repo_id>/${REPO_ID}/g" "${template}"
  sed -i "s/<apps_repo_url>/${APPS_REPOSITORY_ESCAPED}/g" "${template}"
  sed -i "s/<domain>/${DOMAIN}/g" "${template}"
  sed -i "s/<storage_path>/${STORAGE_PATH_ESCAPED}/g" "${template}"
  sed -i "s/<redis_host>/${REDIS_HOST}/g" "${template}"
done

mv -f "$ENV_FILE" "$ROOT_FOLDER/.env"

### --------------------------------
### Start the project
### --------------------------------
if [[ ! "${ci-false}" == "true" ]]; then

  if [[ "${rc-false}" == "true" ]]; then
    docker compose -f docker-compose.rc.yml --env-file "${ROOT_FOLDER}/.env" pull
    # Run docker compose
    docker compose -f docker-compose.rc.yml --env-file "${ROOT_FOLDER}/.env" up --detach --remove-orphans --build || {
      echo "Failed to start containers"
      exit 1
    }
  else
    docker compose --env-file "${ROOT_FOLDER}/.env" pull
    # Run docker compose
    docker compose --env-file "${ROOT_FOLDER}/.env" up --detach --remove-orphans --build || {
      echo "Failed to start containers"
      exit 1
    }
  fi
fi

echo "Tipi is now running"
echo ""
cat <<"EOF"
       _,.
     ,` -.)
    '( _/'-\\-.               
   /,|`--._,-^|            ,     
   \_| |`-._/||          ,'|       
     |  `-, / |         /  /      
     |     || |        /  /       
      `r-._||/   __   /  /  
  __,-<_     )`-/  `./  /
 '  \   `---'   \   /  / 
     |           |./  /  
     /           //  /     
 \_/' \         |/  /         
  |    |   _,^-'/  /              
  |    , ``  (\/  /_        
   \,.->._    \X-=/^         
   (  /   `-._//^`  
    `Y-.____(__}              
     |     {__)           
           ()`     
EOF

port_display=""
if [[ $NGINX_PORT != "80" ]]; then
  port_display=":${NGINX_PORT}"
fi

echo ""
echo "Visit http://${INTERNAL_IP}${port_display}/ to view the dashboard"
echo ""
