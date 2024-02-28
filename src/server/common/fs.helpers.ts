import fs from 'fs';

export const safeReadJson = async (path: string): Promise<unknown | null> => {
  try {
    const rawFile = await fs.promises.readFile(path).then((f) => f.toString());

    return JSON.parse(rawFile);
  } catch {
    return null;
  }
};

export const safeReadFile = async (path: string) => {
  try {
    return await fs.promises.readFile(path).then((f) => f.toString());
  } catch (e) {
    return '';
  }
};

export const readJsonFile = (path: string): unknown | null => {
  try {
    const rawFile = fs.readFileSync(path).toString();

    return JSON.parse(rawFile);
  } catch (e) {
    return null;
  }
};

export const readFile = (path: string): string => {
  try {
    return fs.readFileSync(path).toString();
  } catch {
    return '';
  }
};

export const readdirSync = (path: string): string[] => fs.readdirSync(path);

export const fileExists = (path: string): boolean => fs.existsSync(path);

export const unlinkFile = (path: string) => fs.promises.unlink(path);
