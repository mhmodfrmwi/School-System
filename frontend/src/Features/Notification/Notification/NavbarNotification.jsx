import React, { useState } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";

import Notification from "./Notification";
import { useNotifications } from "../hooks/notification";

const NavbarNotification = () => {
  const { _id: userId, role } = useSelector((state) => state.login);
  const { unreadCount } = useNotifications(userId, role);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#FD813D] dark:text-[#AE45FB]"
      >
        {unreadCount > 0 ? (
          <FaBell className="text-xl" />
        ) : (
          <FaRegBell className="text-xl" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <Notification
            userId={userId}
            role={role}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default NavbarNotification;
