import { COMMENTS_LIMIT } from "@/constants";
import prisma from "../prisma";
import { CommentType, CommentWithTitle, CreateCommentRequestType, CreateCommentResponseType, ListCommentsRequestType } from "../schema/comment";

export const listComments = async (req: {
  userId: string,
  salaryRangeId: string,
} & ListCommentsRequestType): Promise<CommentType[]> => {
  const { userId, toCommentId, prevId, salaryRangeId } = req
  const res = await prisma.comment.findMany({
    where: {
      toCommentId: toCommentId,
      salaryRangeId: salaryRangeId,
      id: {
        lt: prevId || Infinity
      }
    },
    orderBy: {
      id: "desc"
    },
    take: COMMENTS_LIMIT,
    select: {
      id: true,
      body: true,
      threadId: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        }
      },
      likes: {
        select: {
          userId: true, // Anything is ok for isLiked
        },
        where: {
          userId: userId,
        }
      },
      bookmarks: {
        select: {
          userId: true, // Anything is ok for isBookmarked
        },
        where: {
          userId: userId,
        }
      },
      user: {
        select: {
          name: true,
        }
      },
      createdAt: true,
    },
  }).then((res) => {
    return res.map((reply) => {
      return {
        id: reply.id,
        threadId: reply.threadId,
        author: reply.user.name,
        date: new Date(reply.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
        content: reply.body,
        likes: reply._count.likes,
        comments: reply._count.replies,
        isLiked: reply.likes.length > 0,
        isBookmarked: reply.bookmarks.length > 0,
      }
    })
  })
  return res
}

export const commentWithReplies = async (req: {
  userId: string,
  salaryRangeId: string,
  commentId: number
}): Promise<CommentWithTitle> => {
  const { userId, salaryRangeId, commentId } = req
  const res = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      thread: {
        salaryRangeId: salaryRangeId
      },
      salaryRangeId: salaryRangeId
    },
    select: {
      thread: {
        select: {
          id: true,
          genre: {
            select: {
              name: true,
            }
          },
          title: true,
        }
      },
      body: true,
      user: {
        select: {
          name: true,
        }
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        }
      },
      likes: {
        select: {
          userId: true, // Anything is ok for isLiked
        },
        where: {
          userId: userId,
        }
      },
      bookmarks: {
        select: {
          userId: true, // Anything is ok for isBookmarked
        },
        where: {
          userId: userId,
        }
      },
      createdAt: true,
      replies: {
        select: {
          id: true,
          body: true,
          _count: {
            select: {
              likes: true,
              replies: true,
            }
          },
          likes: {
            select: {
              userId: true, // Anything is ok for isLiked
            },
            where: {
              userId: userId,
            }
          },
          bookmarks: {
            select: {
              userId: true, // Anything is ok for isBookmarked
            },
            where: {
              userId: userId,
            }
          },
          user: {
            select: {
              name: true,
            }
          },
          createdAt: true,
        },
        orderBy: {
          id: 'desc',
        },
        take: COMMENTS_LIMIT,
        where: {
          salaryRangeId: salaryRangeId
        }
      }
    },
  }).then((res) => {
    return {
      id: res.thread.id,
      genre: res.thread.genre.name,
      title: res.thread.title,
      content: res.body,
      author: res.user.name,
      date: new Date(res.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
      likes: res._count.likes,
      comments: res._count.replies,
      isLiked: res.likes.length > 0,
      isBookmarked: res.bookmarks.length > 0,
      commentList: res.replies.map((reply) => {
        return {
          id: reply.id,
          threadId: res.thread.id,
          author: reply.user.name,
          date: new Date(reply.createdAt).toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
          content: reply.body,
          likes: reply._count.likes,
          comments: reply._count.replies,
          isLiked: reply.likes.length > 0,
          isBookmarked: reply.bookmarks.length > 0,
        }
      })
    }
  })

  return res
}
  

export const createComment = async (req: {
  userId: string
  salaryRangeId: string
} & CreateCommentRequestType): Promise<CreateCommentResponseType> => {
  const { userId, salaryRangeId, ...data } = req
  const res = await prisma.$transaction(async (prisma) => {
    await prisma.thread.findFirstOrThrow({
      where: {
        id: data.threadId,
        salaryRangeId: req.salaryRangeId
      }
    })
    const res1 = await prisma.comment.create({
      data: {
        userId: userId,
        salaryRangeId: salaryRangeId,
        toCommentId: data.toCommentId,
        body: data.content,
        threadId: data.threadId,
      }
    })
    return {
      commentId: res1.id,
    }
  })
  return res
}