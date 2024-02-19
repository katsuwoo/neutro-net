import {NextRequest, NextResponse} from 'next/server'
import { validate } from '@/lib/validation'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { CreateCommentResponseType, ListCommentsResponseType, createCommentSchema, listCommentsSchema } from '@/lib/schema/comment'
import { createComment, listComments } from '@/lib/db/comment'
import { createReplyNotification } from '@/lib/db/notification'

export async function GET(request: NextRequest): Promise<
  NextResponse<ListCommentsResponseType | ErrorResponseType>
> {
  try {
    const {user, data} = await validate(request.nextUrl.searchParams, listCommentsSchema)
    const res = await listComments({userId: user.id, toCommentId: data.toCommentId, prevId: data.prevId, salaryRangeId: user.salary.sr})
    return NextResponse.json(
      res,
      {status: 200}
    )

  } catch (error) {
    return handleApiError({error})
  }
}

export async function POST(request: NextRequest): Promise<
  NextResponse<CreateCommentResponseType | ErrorResponseType>
> {
  try {
    const {user, data} = await validate(await request.json(), createCommentSchema)
    const res = await createComment({...data, userId: user.id, salaryRangeId: user.salary.sr})
    // Create a notification without waiting for the response
    createReplyNotification({
      commentId: data.toCommentId,
      replyId: res.commentId,
      fromUserId: user.id,
    })
    return NextResponse.json(
      res,
      {status: 201}
    )

  } catch (error) {
    return handleApiError({error})
  }
}