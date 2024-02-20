import { THREADS_LIMIT } from "@/constants";
import prisma from "../prisma"
import { CreateThreadRequestType, CreateThreadResponseType, ListThreadsRequestType, ListThreadsResponseType } from "../schema/thread"

export const listThreads = async (req: {
  userId: string,
  salaryRangeId: string
} & ListThreadsRequestType): Promise<ListThreadsResponseType> => {
  const { userId, prevId, salaryRangeId, genre, bookmarked } = req
  const res = await prisma.comment.findMany({
    where: {
      thread: {
        salaryRangeId: salaryRangeId,
        genreId: genre
      },
      bookmarks: bookmarked === true ? {
        some: {
          userId: userId
        }
      } : undefined,
      toCommentId: null,
      id: prevId ? {
        lt: prevId
      } : undefined
    },
    take: THREADS_LIMIT,
    select: {
      id: true,
      thread: {
        select: {
          id: true,
          title: true,
          genre: {
            select: {
              name: true,
            }
          },
        }
      },
      user: {
        select: {
          name: true,
        }
      },
      body: true,
      createdAt: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        }
      },
      likes: {
        select: {
          userId: true
        },
        where: {
          userId: userId
        }
      },
      bookmarks: {
        select: {
          userId: true
        },
        where: {
          userId: userId
        }
      }
    },
    orderBy: [
      {
        id: 'desc'
      }
    ]
  }).then((comments) => {
    return comments.map((comment) => {
      return {
        id: comment.id,
        thread: {
          title: comment.thread.title,
          genre: comment.thread.genre.name,
        },
        threadId: comment.thread.id,
        author: comment.user.name,
        content: comment.body,
        date: new Date(comment.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
        likes: comment._count.likes,
        comments: comment._count.replies,
        isLiked: comment.likes.length > 0,
        isBookmarked: comment.bookmarks.length > 0,
      };
    });
  });
  return res;
}

export const createThread = async (req: {
  userId: string, 
  salaryRangeId: string
} & CreateThreadRequestType): Promise<CreateThreadResponseType> => {
  const { title, genre, content, userId, salaryRangeId } = req
  const res = await prisma.$transaction(async (prisma) => {
    return await prisma.thread.create({
      data: {
        title: title,
        salaryRangeId: salaryRangeId,
        genreId: genre,
        comments: {
          create: {
            userId: userId,
            body: content,
            salaryRangeId: salaryRangeId
          }
        },
      }
    })
  })
  return { threadId: res.id }
}