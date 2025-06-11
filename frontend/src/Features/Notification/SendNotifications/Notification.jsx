import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheck,
  FaTrash,
  FaTimes,
  FaBell,
  FaPaperPlane,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { fetchStudents } from "../../../Features/Admin/components/AdminRedux/studentSlice";
import { fetchManagers } from "../../../Features/Admin/components/AdminRedux/managerSlice";
import { fetchParents } from "../../../Features/Admin/components/AdminRedux/parentSlice";
import { fetchTeachers } from "../../../Features/Admin/components/AdminRedux/teacherSlice";
import { fetchAdmins } from "../../../Features/Admin/components/AdminRedux/adminSlice";
import NotificationForm from "./NotificationForm";
import { useNotifications } from "../hooks/notification";
import SpinnerMini from "../../../ui/SpinnerMini";

const Notification = ({ userId, role, onClose }) => {
  const dispatch = useDispatch();
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  } = useNotifications(userId, role);
  const [showForm, setShowForm] = useState(false);

  const { students = [], loading: studentsLoading } = useSelector(
    (state) => state.students,
  );
  const { managers = [], loading: managersLoading } = useSelector(
    (state) => state.managers || {},
  );
  const { parents = [], loading: parentsLoading } = useSelector(
    (state) => state.parents || {},
  );
  const { admins = [], loading: adminsLoading } = useSelector(
    (state) => state.admins || {},
  );
  const { teachers = [], loading: teachersLoading } = useSelector(
    (state) => state.teachers || {},
  );

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchManagers());
    dispatch(fetchParents());
    dispatch(fetchAdmins());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const getSenderInfo = (sender) => {
    if (!sender?.id || !sender?.model)
      return { name: "System", role: "System" };

    let userList = [];
    let roleName = sender.model;

    switch (sender.model) {
      case "Student":
        userList = students;
        break;
      case "Manager":
        userList = managers;
        break;
      case "Parent":
        userList = parents;
        break;
      case "Admin":
        userList = admins;
        break;
      case "Teacher":
        userList = teachers;
        break;
      default:
        return { name: "Unknown", role: sender.model };
    }

    const user = userList.find((user) => user._id === sender.id);
    return {
      name: user ? `${user.fullName}` : "Unknown User",
      role: roleName,
    };
  };

  const allDataLoading =
    isLoading ||
    studentsLoading ||
    managersLoading ||
    parentsLoading ||
    adminsLoading ||
    teachersLoading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-white/70">
      <div className="h-[75vh] w-[80vw] max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-[#117C90] to-[#0D5665] px-6 py-4 text-white dark:from-[#0D5665] dark:to-[#093D4A]">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
              <FaBell className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-red-700 px-2 py-1 text-xs">
                  {unreadCount} new
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              title="Send Notification"
            >
              <FaPaperPlane size={12} />
              <span>Send</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-gradient-to-r from-[#117C90]/10 to-[#0D5665]/10 p-4 dark:from-[#0D5665]/20 dark:to-[#093D4A]/20">
            <NotificationForm
              onClose={() => setShowForm(false)}
              currentUser={{ id: userId, role }}
              userLists={{
                students,
                managers,
                parents,
                admins,
                teachers,
              }}
            />
          </div>
        )}

        <div className="h-[calc(100%-120px)] overflow-y-auto bg-gray-50 p-6 dark:bg-gray-800">
          {allDataLoading ? (
            <div className="flex justify-center pt-44">
              <SpinnerMini />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <FaBell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                No notifications yet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll notify you when something arrives
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1 rounded-full bg-[#117C90]/10 px-3 py-1 text-xs text-[#117C90] hover:bg-[#117C90]/20 disabled:opacity-50 dark:bg-[#0D5665]/20 dark:text-white dark:hover:bg-[#0D5665]/30"
                >
                  <FaCheck size={12} />
                  Mark all as read
                </button>
              </div>

              {notifications.map((notification) => {
                const senderInfo = getSenderInfo(notification.sender);
                return (
                  <div
                    key={notification._id}
                    className={`rounded-lg p-3 ${
                      !notification.isRead
                        ? "bg-[#117C90]/25 dark:bg-[#0D5665]"
                        : "bg-white dark:bg-gray-700"
                    } shadow-sm dark:shadow-none`}
                  >
                    <div className="grid grid-cols-8">
                      <div className="col-span-6 sm:col-span-7">
                        <p className="w-[80%] break-words text-sm font-medium text-gray-800 dark:text-gray-100">
                          {notification.content}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-gray-600 dark:text-gray-300">
                            From: {senderInfo.name} ({senderInfo.role})
                          </span>
                          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                            {notification.type}
                          </span>
                          <span className="text-gray-500 dark:text-white">
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 flex sm:col-span-1">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="rounded-full p-1 text-[#117C90] dark:text-white"
                            title="Mark as read"
                          >
                            <FaCheck size={20} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this notification?",
                              )
                            ) {
                              deleteNotification(notification._id);
                            }
                          }}
                          className="rounded-full p-1 text-red-500"
                          title="Delete notification"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
