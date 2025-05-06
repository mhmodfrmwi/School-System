const notificationService = require("../../services/notificationService");
const sendNotification = async (req, res) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.status(201).json({
      status: 201,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const { receiverId, receiverModel } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const result = await notificationService.getNotificationsByReceiver(
      receiverId,
      receiverModel,
      {
        limit: parseInt(limit),
        page: parseInt(page),
      }
    );

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationService.markAsRead(notificationId);
    res.status(200).json({
      status: 200,
      data: notification,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

const readAllNotifications = async (req, res) => {
  try {
    const { receiverId, receiverModel } = req.params;
    const result = await notificationService.markAllAsRead(
      receiverId,
      receiverModel
    );
    res.status(200).json({
      status: 200,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const removeNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationService.deleteNotification(
      notificationId
    );
    res.status(200).json({
      status: 200,
      data: notification,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};
const sendNotificationForStudentsInTheSameGrade = async (req, res) => {
  try {
    const notification =
      await notificationService.createNotificationForStudentsInTheSameGrade(
        req.body
      );
    res.status(201).json({
      status: 201,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
const sendNotificationForAllStudents = async (req, res) => {
  try {
    const notification =
      await notificationService.createNotificationForAllStudents(req.body);
    res.status(201).json({
      status: 201,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
const sendNotificationForStudentsInTheSameClass = async (req, res) => {
  try {
    const notification =
      await notificationService.createNotificationForStudentsInTheSameClass(
        req.body
      );
    res.status(201).json({
      status: 201,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
module.exports = {
  sendNotification,
  getUserNotifications,
  readNotification,
  readAllNotifications,
  removeNotification,
  sendNotificationForStudentsInTheSameGrade,
  sendNotificationForAllStudents,
  sendNotificationForStudentsInTheSameClass,
};
