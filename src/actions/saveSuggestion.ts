'use server';

import { z } from 'zod';
import { getDb } from '@/lib/mongodb';
import FormValidator from '@/lib/FormValidator';

type ActionState =
  | { status: 'SUCCESS' }
  | { status: 'INITIAL' }
  | { status: 'ERROR'; error: string; fieldErrors?: Record<string, string[]> };

export async function saveSuggestion( _prevState: ActionState, formData: FormData ): Promise<ActionState> {
  const values = {
    email: String(formData.get('email') ?? ''),
    topic: String(formData.get('topic') ?? ''),
    description: String(formData.get('description') ?? ''),
  };

  try {
    await FormValidator.parseAsync(values);

    const db = await getDb('w');
    await db.collection('suggestions').insertOne({
      ...values,
      createdAt: new Date(),
    });

    return { status: 'SUCCESS' };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        status: 'ERROR',
        error: 'Validation failed',
        fieldErrors: z.flattenError(err).fieldErrors,
      };
    }
    return { status: 'ERROR', error: 'Unexpected server error' };
  }
}
