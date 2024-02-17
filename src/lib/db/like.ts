import prisma from "../prisma"
import { CreateLikeRequestType, CreateLikeResponseType, DeleteLikeRequestType, DeleteLikeResponseType } from "../schema/like"

export const createLike = async (req: {
  data: CreateLikeRequestType, 
  userId: string
}): Promise<CreateLikeResponseType> => {
  const { data, userId } = req
  const res = await prisma.$transaction(async (prisma) => {
    await prisma.like.upsert({
      create: {
        userId: userId,
        commentId: data.commentId
      },
      update: {},
      where: {
        userId_commentId: {
          userId: userId,
          commentId: data.commentId
        }
      },
    });
    const likes = await prisma.like.count({
      where: {
        commentId: data.commentId
      }
    });
    return {
      likes
    };
  });

  return res
}

export const deleteLike = async (req: {
  data: DeleteLikeRequestType, 
  userId: string
}): Promise<DeleteLikeResponseType> => {
  const { data, userId } = req
  const res = await prisma.$transaction(async (prisma) => {
    await prisma.like.delete({
      where: {
        userId_commentId: {
          userId: userId,
          commentId: data.commentId
        }
      }
    });
    const likes = await prisma.like.count({
      where: {
        commentId: data.commentId
      }
    });
    return {
      likes
    };
  });

  return res
}