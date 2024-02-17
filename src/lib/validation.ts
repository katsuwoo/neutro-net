import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextauth-options'
import { BadRequestError, UnauthorizedError } from './errors';
import { z } from 'zod';

export async function getUserForApi() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    throw new UnauthorizedError();
  }
  return {
    ...session.user,
    salary: session.user.salary
  }
}

export async function validate<T>(input: unknown, schema: z.Schema<T>) {
  const user = await getUserForApi()
  return {
    user,
    data: schema.parse(input)
  };
}