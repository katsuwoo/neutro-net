import {NextRequest, NextResponse} from 'next/server'
import { validate } from '@/lib/validation'
import { ErrorResponseType, handleApiError } from '@/lib/errors'
import { CreateCommentResponseType, createCommentSchema } from '@/lib/schema/comment'
import { createComment } from '@/lib/db/comment'
import { createReplyNotification } from '@/lib/db/notification'

export async function POST(request: NextRequest): Promise<
  NextResponse<CreateCommentResponseType | ErrorResponseType>
> {
  try {
    const {user, data} = await validate(await request.json(), createCommentSchema)
    const res = await createComment({data, userId: user.id})
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