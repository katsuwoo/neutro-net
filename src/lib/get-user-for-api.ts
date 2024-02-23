import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextauth-options'
import { UnauthorizedError } from './errors';

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
