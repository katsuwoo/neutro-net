import { NextRequest, NextResponse } from "next/server";
import { validate } from '@/lib/validation';
import { ErrorResponseType, handleApiError } from '@/lib/errors';
import { CreateLikeResponseType, createLikeSchema, DeleteLikeResponseType, deleteLikeSchema } from "@/lib/schema/like";
import { createLike, deleteLike } from "@/lib/db/like";
import { createLikeNotification, deleteLikeNotification } from "@/lib/db/notification";

export async function POST(request: NextRequest): Promise<
  NextResponse<CreateLikeResponseType | ErrorResponseType>
> {
  try {
    const { user, data} = await validate(await request.json(), createLikeSchema)
    const res = await createLike({data, userId: user.id})
    // Create a notification without waiting for the response
    createLikeNotification({
      commentId: data.commentId,
      fromUserId: user.id,
    })
    return NextResponse.json(
      res,
      {status: 201}
    )
  } catch (error) {
    return handleApiError({ error });
  }
};

export async function DELETE(request: NextRequest): Promise<
  NextResponse<DeleteLikeResponseType | ErrorResponseType>
> {
  try {
    const { user, data} = await validate(await request.json(), deleteLikeSchema)
    const res = await deleteLike({data, userId: user.id})
    // Delete a notification without waiting for the response
    deleteLikeNotification({
      commentId: data.commentId,
      fromUserId: user.id,
    })
    return NextResponse.json(
      res, 
      {status: 200}
    )
  } catch (error) {
    return handleApiError({ error });
  }
}