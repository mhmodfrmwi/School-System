const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    sender: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      model: {
        type: String,
        required: true,
        enum: ["Student", "Admin", "Parent", "Teacher", "Manager"],
      },
    },
    receiver: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      model: {
        type: String,
        required: true,
        enum: ["Student", "Admin", "Parent", "Teacher", "Manager"],
      },
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ["alert", "message", "reminder"] },
  },
  { timestamps: true }
);

notificationSchema.index({ "receiver.id": 1, isRead: 1, createdAt: -1 });
notificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
