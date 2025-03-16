const mongoose = require("mongoose");

const virtualRoomAttendanceSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    virtualRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VirtualRoom",
      required: true,
    },
    status: {
      type: String,
      enum: ["attended", "missed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

virtualRoomAttendanceSchema.index(
  { teacherId: 1, virtualRoomId: 1 },
  { unique: true }
);

const VirtualRoomAttendance = mongoose.model(
  "ManagerVirtualRoomAttendance",
  virtualRoomAttendanceSchema
);

module.exports = VirtualRoomAttendance;