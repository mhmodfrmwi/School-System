const mongoose = require("mongoose");

const virtualRoomAttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: "ObjectId",
      ref: "Student",
      required: true,
    },
    virtualRoomId: {
      type: "ObjectId",
      ref: "VirtualRoom",
      required: true,
    },
    status: {
      type: "String",
      enum: ["attended", "missed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

virtualRoomAttendanceSchema.index(
  { studentId: 1, virtualRoomId: 1 },
  { unique: true }
);

const VirtualRoomAttendance = mongoose.model(
  "VirtualRoomAttendance",
  virtualRoomAttendanceSchema
);

module.exports = VirtualRoomAttendance;
