import prisma from "../prisma";

export const listNotifications = async (req: {
  userId: string
}) => {
  const { userId } = req
  const res = await prisma.notification.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      type: true,
      comment: {
        select: {
          body: true,
        }
      },
      fromUser: {
        select: {
          name: true,
        }
      },
      reply: {
        select: {
          body: true,
        }
      },
      url: true,
      createdAt: true,
    }
  }).then((res) => {
    return res.map((notification) => ({
      ...notification,
      date: notification.createdAt.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    }));
  })
  return res
}

export const createLikeNotification = async (req: {
  commentId: number, 
  fromUserId: string
}) => {
  const { commentId, fromUserId } = req
  const res = await prisma.$transaction(async (prisma) => {
    const { userId } = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
      select: {
        userId: true
      }
    })
    if (userId === fromUserId) {
      return
    }
    const res1 = await prisma.notification.create({
      data: {
        userId: userId,
        type: "LIKE",
        commentId: commentId,
        fromUserId: fromUserId,
        url: `/comments/${commentId}`
      }
    })
  })
}

export const deleteLikeNotification = async (req: {
  commentId: number,
  fromUserId: string,
}) => {
  const { commentId, fromUserId } = req
  const res = await prisma.notification.deleteMany({
    where: {
      commentId: commentId,
      fromUserId: fromUserId,
    }
  })
}

export const createReplyNotification = async (req: {
  commentId: number,
  replyId: number,
  fromUserId: string,
}) => {
  const { commentId, replyId, fromUserId } = req
  const res = await prisma.$transaction(async (prisma) => {
    const { userId } = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
      select: {
        userId: true,
      }
    })
    if (userId === fromUserId) {
      return
    }
    const res1 = await prisma.notification.create({
      data: {
        userId: userId,
        type: "REPLY",
        commentId: commentId,
        fromUserId: fromUserId,
        replyId: replyId,
        url: `/comments/${commentId}`
      }
    })
  })
}

export const deleteReplyNotification = async (req: {
  commentId: number,
  replyId: number,
  fromUserId: string,
}) => {
  const { commentId, replyId, fromUserId
  } = req
  const res = await prisma.notification.deleteMany({
    where: {
      commentId: commentId,
      replyId: replyId,
      fromUserId: fromUserId,
    }
  })
}