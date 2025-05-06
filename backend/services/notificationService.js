const Student = require("../DB/StudentModel");
const Notification = require("../DB/NotificationModel");

const createNotification = async (notificationData) => {
  try {
    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    throw new Error(`Failed to create notification: ${error.message}`);
  }
};

const getNotificationsByReceiver = async (
  receiverId,
  receiverModel,
  { limit = 10, page = 1, readStatus }
) => {
  try {
    const query = {
      "receiver.id": receiverId,
      "receiver.model": receiverModel,
    };

    if (readStatus !== undefined) {
      query.isRead = readStatus;
    }

    const notifications = await Notification.find(query)
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Notification.countDocuments(query);

    return {
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error(`Failed to fetch notifications: ${error.message}`);
  }
};

const markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  } catch (error) {
    throw new Error(`Failed to mark notification as read: ${error.message}`);
  }
};

const markAllAsRead = async (receiverId, receiverModel) => {
  try {
    const result = await Notification.updateMany(
      {
        "receiver.id": receiverId,
        "receiver.model": receiverModel,
        isRead: false,
      },
      { isRead: true }
    );

    return result;
  } catch (error) {
    throw new Error(
      `Failed to mark all notifications as read: ${error.message}`
    );
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  } catch (error) {
    throw new Error(`Failed to delete notification: ${error.message}`);
  }
};
const createNotificationForStudentsInTheSameGrade = async (
  notificationData
) => {
  try {
    const { gradeId } = notificationData;

    if (!gradeId) {
      throw new Error("Grade ID is required to send notifications");
    }
    const studentsInGrade = await Student.find({ gradeId: gradeId });
    if (!studentsInGrade || studentsInGrade.length === 0) {
      throw new Error("No students found in the specified grade");
    }
    const studentIds = studentsInGrade.map((student) => student._id);

    for (const studentId of studentIds) {
      const notification = new Notification({
        ...notificationData,
        receiver: {
          id: studentId,
          model: "Student",
        },
      });
      await notification.save();
    }
    return { message: "Notifications sent successfully" };
  } catch (error) {
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};
const createNotificationForAllStudents = async (notificationData) => {
  try {
    const students = await Student.find();
    if (!students || students.length === 0) {
      throw new Error("No students found");
    }
    const studentIds = students.map((student) => student._id);

    for (const studentId of studentIds) {
      const notification = new Notification({
        ...notificationData,
        receiver: {
          id: studentId,
          model: "Student",
        },
      });
      await notification.save();
    }
    return { message: "Notifications sent successfully" };
  } catch (error) {
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};
const createNotificationForStudentsInTheSameClass = async (
  notificationData
) => {
  try {
    const { classId } = notificationData;
    if (!classId) {
      throw new Error("Class ID is required to send notifications");
    }
    const studentsInClass = await Student.find({ classId: classId });
    if (!studentsInClass || studentsInClass.length === 0) {
      throw new Error("No students found in the specified class");
    }
    const studentIds = studentsInClass.map((student) => student._id);
    for (const studentId of studentIds) {
      const notification = new Notification({
        ...notificationData,
        receiver: {
          id: studentId,
          model: "Student",
        },
      });
      await notification.save();
    }
    return { message: "Notifications sent successfully" };
  } catch (error) {
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};
module.exports = {
  createNotification,
  getNotificationsByReceiver,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotificationForStudentsInTheSameGrade,
  createNotificationForAllStudents,
  createNotificationForStudentsInTheSameClass,
};
