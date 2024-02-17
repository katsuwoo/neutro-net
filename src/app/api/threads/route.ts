import {NextRequest, NextResponse} from 'next/server'
import { CreateThreadResponseType, createThreadSchema } from '@/lib/schema/thread'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { validate } from '@/lib/validation'
import { createThread } from '@/lib/db/thread'

export async function POST(request: NextRequest): Promise<NextResponse<CreateThreadResponseType | ErrorResponseType>> {
  try {
    const { user, data } = await validate(await request.json(), createThreadSchema)
    return NextResponse.json(
      await createThread({data, userId: user.id, salaryRangeId: user.salary.sr}), 
      {status: 201}
    )

  } catch (error) {
    return handleApiError({error})
  }
}