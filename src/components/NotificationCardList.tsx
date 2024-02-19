'use client';

import React, { useEffect, useRef, useState } from "react";
import { ListNotificationsResponseType } from "@/lib/schema/notification";
import NotificationCard from "./NotificationCard";
import { NOTIFICATIONS_LIMIT } from "@/constants";
import { useInView } from '@/lib/hooks';
import { listNotifications } from "@/lib/api";

const NotificationCardList: React.FC<{notifications: ListNotificationsResponseType}> = (props) => {
  const [notifications, setNotifications] = useState<ListNotificationsResponseType>(props.notifications);
  const [isFetching, setIsFetching] = useState(false);
  const [allFetched, setAllFetched] = useState(props.notifications.length < NOTIFICATIONS_LIMIT);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  
  useEffect(() => {
    if (inView && allFetched === false) {
      setIsFetching(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isFetching) {
      const prevId = notifications[notifications.length - 1].id
      listNotifications({
        prevId: prevId,
      }).then((res) => {
        if (res !== null) {
          setNotifications((prev) => {
            return [
              ...prev,
              ...res
            ]
          });
          if (res.length < NOTIFICATIONS_LIMIT) {
            setAllFetched(true);
          }
        } else {
          // TODO: Show error message
          setAllFetched(true);
        }
        setIsFetching(false);
      });
    }
  }, [isFetching]);
  
  return (
    <div>
      <ul className="flex flex-col gap-2 pb-10">
        {notifications.map((notification) => (
          <NotificationCard key={`nc_${notification.id}`} {...notification} />
        ))}
      </ul>
      <div ref={ref} />
    </div>
  )
};

export default NotificationCardList;