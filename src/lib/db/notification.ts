import { NOTIFICATIONS_LIMIT } from "@/constants";
import prisma from "../prisma";
import { ListNotificationsResponseType } from "../schema/notification";

export const listNotifications = async (req: {
  userId: string,
  prevId?: number,
}): Promise<ListNotificationsResponseType> => {
  const { userId, prevId } = req
  const notifications: ListNotificationsResponseType = await prisma.notification.findMany({
    where: {
      userId: userId,
      id: prevId ? {
        lt: prevId
      } : undefined
    },
    orderBy: {
      id: "desc",
    },
    take: NOTIFICATIONS_LIMIT,
    select: {
      id: true,
      comment: {
        select: {
          body: true,
        },
      },
      body: true,
      reply: {
        select: {
          body: true,
        },
      },
      fromUser: {
        select: {
          name: true,
        },
      },
      type: true,
      isRead: true,
      url: true,
    },
  }).then((res) => {
    return res.reduce((acc: ListNotificationsResponseType, notification) => {
      if (notification.type === "LIKE" && notification.fromUser && notification.comment && notification.url) {
        acc.push({
          id: notification.id,
          type: notification.type,
          message: `${notification.fromUser.name}さんがあなたのコメントにいいねしました`,
          quote: notification.comment.body.length > 50 ? notification.comment.body.replace(/\n/g, " ").substring(0, 50) + "..." : notification.comment.body.replace(/\n/g, " "),
          url: notification.url
        });
      } else if (notification.type === "REPLY" && notification.fromUser && notification.reply && notification.url) {
        acc.push({
          id: notification.id,
          type: notification.type,
          message: `${notification.fromUser.name}さんがあなたのコメントに返信しました`,
          quote: notification.reply.body.length > 50 ? notification.reply.body.replace(/\n/g, " ").substring(0, 50) + "..." : notification.reply.body.replace(/\n/g, " "),
          url: notification.url
        });
      }
      return acc;
    }, []);
  })
  return notifications
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