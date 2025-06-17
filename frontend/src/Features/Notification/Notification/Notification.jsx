import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheck, FaTrash, FaTimes, FaBell } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { fetchStudents } from "../../../Features/Admin/components/AdminRedux/studentSlice";
import { fetchManagers } from "../../../Features/Admin/components/AdminRedux/managerSlice";
import { fetchParents } from "../../../Features/Admin/components/AdminRedux/parentSlice";
import { fetchTeachers } from "../../../Features/Admin/components/AdminRedux/teacherSlice";
import { fetchAdmins } from "../../../Features/Admin/components/AdminRedux/adminSlice";
import { useNotifications } from "../hooks/notification";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useTranslation } from "react-i18next";

const Notification = ({ userId, role, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dispatch = useDispatch();
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  } = useNotifications(userId, role);

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
      return {
        name: t("notifications.system"),
        role: t("notifications.system"),
      };

    let userList = [];
    let roleName = sender.model;

    switch (sender.model) {
      case "Student":
        userList = students;
        roleName = t("roles.student");
        break;
      case "Manager":
        userList = managers;
        roleName = t("roles.manager");
        break;
      case "Parent":
        userList = parents;
        roleName = t("roles.parent");
        break;
      case "Admin":
        userList = admins;
        roleName = t("roles.admin");
        break;
      case "Teacher":
        userList = teachers;
        roleName = t("roles.teacher");
        break;
      default:
        return { name: t("notifications.unknownUser"), role: sender.model };
    }

    const user = userList.find((user) => user._id === sender.id);
    return {
      name: user ? `${user.fullName}` : t("notifications.unknownUser"),
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
      <div
        className="h-[75vh] w-[80vw] max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-6 py-4 text-white dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          <div className="flex items-center">
            <div
              className={`${isRTL ? "ml-3" : "mr-3"} flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white`}
            >
              <FaBell className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">
              {t("notifications.title")}
              {unreadCount > 0 && (
                <span
                  className={`${isRTL ? "mr-2" : "ml-2"} rounded-full bg-red-700 px-2 py-1 text-xs`}
                >
                  {unreadCount} {t("notifications.new")}
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none"
              title={t("notifications.close")}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="h-[calc(100%-120px)] overflow-y-scroll bg-gray-50 p-6 dark:bg-gray-800">
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
                {t("notifications.empty.title")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("notifications.empty.subtitle")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`flex ${isRTL ? "justify-start" : "justify-end"}`}
              >
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 px-3 py-1 text-xs text-[#FD813D] hover:from-[#FD813D]/20 hover:via-[#CF72C0]/20 hover:to-[#BC6FFB]/20 disabled:opacity-50 dark:from-[#CE4EA0]/20 dark:via-[#BF4ACB]/20 dark:to-[#AE45FB]/20 dark:text-white dark:hover:from-[#CE4EA0]/30 dark:hover:via-[#BF4ACB]/30 dark:hover:to-[#AE45FB]/30"
                >
                  <FaCheck size={12} />
                  {t("notifications.markAllAsRead")}
                </button>
              </div>

              {notifications.map((notification) => {
                const senderInfo = getSenderInfo(notification.sender);
                return (
                  <div
                    key={notification._id}
                    className={`rounded-lg p-3 ${
                      !notification.isRead
                        ? "bg-gradient-to-r from-[#FD813D]/25 via-[#CF72C0]/25 to-[#BC6FFB]/25 dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
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
                            {t("notifications.from")}: {senderInfo.name} (
                            {senderInfo.role})
                          </span>
                          <span className="rounded-full bg-gradient-to-r from-[#FD813D]/20 via-[#CF72C0]/20 to-[#BC6FFB]/20 px-2 py-0.5 text-gray-700 dark:from-[#CE4EA0]/20 dark:via-[#BF4ACB]/20 dark:to-[#AE45FB]/20 dark:text-white">
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
                      <div
                        className={`col-span-2 flex ${isRTL ? "justify-start" : "justify-end"} sm:col-span-1`}
                      >
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="rounded-full p-1 text-[#FD813D] dark:text-white"
                            title={t("notifications.markAsRead")}
                          >
                            <FaCheck size={20} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                t("notifications.deleteConfirmation"),
                              )
                            ) {
                              deleteNotification(notification._id);
                            }
                          }}
                          className="rounded-full p-1 text-red-500"
                          title={t("notifications.delete")}
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
