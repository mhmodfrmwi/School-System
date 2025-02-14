const mongoose = require("mongoose");

const virtualRoomStatusSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  virtualRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VirtualRoom",
    required: true,
  },
  hasOpened: {
    type: Boolean,
    default: false,
  },
  openedAt: {
    type: Date,
    default: null,
  },
});

virtualRoomStatusSchema.index({ studentId: 1, virtualRoomId: 1 }, { unique: true });

const VirtualRoomStatus = mongoose.model("VirtualRoomStatus", virtualRoomStatusSchema);

module.exports = VirtualRoomStatus;