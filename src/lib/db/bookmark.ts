import prisma from "../prisma";
import { CreateBookmarkRequestType, DeleteBookmarkRequestType } from "../schema/bookmark";

export const createBookmark = async (req: {
  data: CreateBookmarkRequestType, 
  userId: string
}): Promise<void> => {
  const { data, userId } = req
  await prisma.$transaction(async (prisma) => {
    await prisma.bookmark.upsert({
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
  });
}

export const deleteBookmark = async (req: {
  data: DeleteBookmarkRequestType, 
  userId: string
}): Promise<void> => {
  const { data, userId } = req
  await prisma.$transaction(async (prisma) => {
    await prisma.bookmark.delete({
      where: {
        userId_commentId: {
          userId: userId,
          commentId: data.commentId
        }
      }
    });
  });
}
