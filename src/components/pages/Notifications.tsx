import { authOptions } from "@/lib/nextauth-options";
import { ListNotificationsResponseType } from "@/lib/schema/notification";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import NotificationCardList from "../NotificationCardList";
import { listNotifications } from "@/lib/db/notification";

const NotificationsPageComponent: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.salary === null) {
    redirect("/");
  }
  const notifications: ListNotificationsResponseType = await listNotifications({
    userId: session.user.id,
  });
  // await prisma.notification.updateMany({
  //   where: {
  //     userId: session.user.id,
  //     isRead: false,
  //   },
  //   data: {
  //     isRead: true,
  //   }
  // });
  return (
    <div className="p-2">
      <h1 className="text-2xl pb-8 text-main-blue">通知一覧</h1>
      <NotificationCardList notifications={notifications} />
    </div>
  );
};

export default NotificationsPageComponent;