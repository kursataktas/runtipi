'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { appLifecycle } from '@/server/services/app-lifecycle/app-lifecycle.service';
import { handleActionError } from '../utils/handle-action-error';
import { ensureUser } from '../utils/ensure-user';

const input = z.object({
  id: z.string(),
  archiveName: z.string(),
});

/**
 * Given an app id, backs up the app.
 */
export const backupAppAction = action(input, async ({ id, archiveName }) => {
  try {
    await ensureUser();

    await appLifecycle.executeCommand('backupApp', { appId: id, archiveName });

    revalidatePath('/apps');
    revalidatePath(`/app/${id}`);
    revalidatePath(`/app-store/${id}`);

    return { success: true };
  } catch (e) {
    return handleActionError(e);
  }
});
