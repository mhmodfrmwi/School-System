const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/General/notificationController");
const validateJwt = require("../middlewares/validateJWT");

router.post("/", validateJwt, notificationController.sendNotification);
// Send notification to all students in the same grade
router.post(
  "/students-in-same-grade",
  validateJwt,
  notificationController.sendNotificationForStudentsInTheSameGrade
);
// Send notification to all students
router.post(
  "/all-students",
  validateJwt,
  notificationController.sendNotificationForAllStudents
);
// Send notification to all students in the same class
router.post(
  "/students-in-same-class",
  validateJwt,
  notificationController.sendNotificationForStudentsInTheSameClass
);
// Get notifications for a user
router.get(
  "/:receiverId/:receiverModel",
  validateJwt,
  notificationController.getUserNotifications
);

// Mark single notification as read
router.patch(
  "/:notificationId/read",
  validateJwt,
  notificationController.readNotification
);

// Mark all notifications as read for a user
router.patch(
  "/:receiverId/:receiverModel/read-all",
  validateJwt,
  notificationController.readAllNotifications
);

// Delete a notification
router.delete(
  "/:notificationId",
  validateJwt,
  notificationController.removeNotification
);
module.exports = router;
