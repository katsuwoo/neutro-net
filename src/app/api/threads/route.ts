import {NextRequest, NextResponse} from 'next/server'
import { listThreadsSchema, ListThreadsResponseType, CreateThreadResponseType, createThreadSchema } from '@/lib/schema/thread'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { validate } from '@/lib/validation'
import { listThreads, createThread } from '@/lib/db/thread'

export async function GET(request: NextRequest): Promise<NextResponse<ListThreadsResponseType | ErrorResponseType>> {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams)
    const { user, data } = await validate(params, listThreadsSchema)
    return NextResponse.json(
      await listThreads({userId: user.id, salaryRangeId: user.salary.sr, ...data}), 
      {status: 200}
    )

  } catch (error) {
    return handleApiError({error})
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateThreadResponseType | ErrorResponseType>> {
  try {
    const { user, data } = await validate(await request.json(), createThreadSchema)
    return NextResponse.json(
      await createThread({...data, userId: user.id, salaryRangeId: user.salary.sr}), 
      {status: 201}
    )

  } catch (error) {
    return handleApiError({error})
  }
}