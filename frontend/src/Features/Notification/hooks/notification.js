import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  sendNotificationApi,
} from "../services/apiNotification";
import { useSelector } from "react-redux";
//get notificatino
export const useNotifications = (userId, role) => {
  const queryClient = useQueryClient();
  const {
    data: notifications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", userId, role],
    queryFn: () => fetchNotifications(userId, role),
    enabled: !!userId,
    select: (data) =>
      data.map((notification) => ({
        ...notification,
        createdAt: new Date(notification.createdAt),
      })),
  });
  // Mark single as read
  const { mutate: markAsRead } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", userId, role]);
      toast.success("Notification marked as read");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mark all as read
  const { mutate: markAllAsRead } = useMutation({
    mutationFn: () => markAllNotificationsAsRead(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", userId, role]);
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Delete notification
  const { mutate: deleteNotif } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications", userId, role]);
      toast.success("Notification deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification: deleteNotif,
    unreadCount: notifications.filter((n) => !n.isRead).length,
  };
};

// useNotificationService.js
export const useNotificationService = () => {
  const { _id: userId, role } = useSelector((state) => state.login);
  const queryClient = useQueryClient();

  const { mutate: sendNotification, isLoading: isSending } = useMutation({
    mutationFn: sendNotificationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userId, role],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send notification");
    },
  });
  return { isSending, sendNotification };
};
