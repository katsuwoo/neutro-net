
import { z } from 'zod';
import { getUserForApi } from './get-user-for-api';

export async function validate<T>(input: object, schema: z.Schema<T>) {
  const user = await getUserForApi()
  return {
    user,
    data: schema.parse(input)
  };
}