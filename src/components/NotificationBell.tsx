import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NotificationBell: React.FC<{ count: number }> = ({ count }) => {
  const displayCount = count > 9 ? "9+" : count.toString();
  return (
    <Link href="/notifications" className="relative">
      <FontAwesomeIcon icon={faBell} className="h-7 text-main-blue relative pr-2"></FontAwesomeIcon>
      {count > 0 && <p className="absolute text-center text-xs text-white bg-sub-blue rounded-full px-1 top-0 right-0 min-w-5">{count}</p>}
    </Link>
  );
}

export default NotificationBell;