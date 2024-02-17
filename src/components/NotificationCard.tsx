import React from "react";
import { NotificationComponentType } from "@/lib/schema/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NotificationCard: React.FC<NotificationComponentType> = (props) => {
  return (
    <li key={`nc_${props.id}`} className="flex flex-col gap-2 border-2 rounded-xl border-main-blue p-2 px-4">
      <Link href={props.url}>
        <div className="flex gap-3 items-center pb-2 border-b-[1px] border-main-blue">
          <FontAwesomeIcon
            icon={props.type === "LIKE" ? faHeart : faReply}
            className={`h-6 ${props.type === "LIKE" ? "text-red-500" : "text-main-blue"} `}
          />
          <p>{props.message}</p>
        </div>
        <div className={`pt-2 pl-2 ${props.type === "LIKE" ? "text-gray-400" : ""} text-sm`}>{props.quote}</div>
      </Link>
    </li>
  );
};

export default NotificationCard;