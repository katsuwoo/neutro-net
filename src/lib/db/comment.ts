import prisma from "../prisma";
import { CreateCommentRequestType, CreateCommentResponseType } from "../schema/comment";

export const createComment = async (req: {
  data: CreateCommentRequestType, 
  userId: string
}): Promise<CreateCommentResponseType> => {
  const { data, userId } = req
  const res = await prisma.$transaction(async (prisma) => {
    const res1 = await prisma.comment.create({
      data: {
        userId: userId,
        toCommentId: data.toCommentId,
        body: data.content,
        threadId: data.threadId // Add the missing threadId property
      }
    })
    return {
      commentId: res1.id,
    }
  })
  return res
}