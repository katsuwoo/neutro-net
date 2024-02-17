import { authOptions } from "@/lib/nextauth-options";
import prisma from "@/lib/prisma";
import { ListNotificationsResponseType } from "@/lib/schema/notification";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import NotificationCardList from "../NotificationCardList";

const NotificationsPageComponent: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    redirect("/");
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });
  const notifications: ListNotificationsResponseType = await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
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
  });
  return (
    <div className="p-2">
      <h1 className="text-2xl pb-8">通知一覧</h1>
      <NotificationCardList notifications={notifications} />
    </div>
  );
};

export default NotificationsPageComponent;