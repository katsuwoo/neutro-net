import React from "react";
import { ListNotificationsResponseType } from "@/lib/schema/notification";
import NotificationCard from "./NotificationCard";

const NotificationCardList: React.FC<{notifications: ListNotificationsResponseType}> = ({notifications}) => {
  return (
    <ul className="flex flex-col gap-2 pb-10">
      {notifications.map((notification) => (
        <NotificationCard key={`nc_${notification.id}`} {...notification} />
      ))}
    </ul>
  )
};

export default NotificationCardList;