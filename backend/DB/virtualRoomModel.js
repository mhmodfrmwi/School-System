const mongoose = require("mongoose");
const moment = require("moment");

const virtualRoomSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    subjectId: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    academicYearId: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
    gradeId: {
      type: "ObjectId",
      ref: "Grade",
      required: true,
    },
    semesterId: {
      type: "ObjectId",
      ref: "Semester",
      required: true,
    },
    startTime: {
      type: "Date",
      required: true,
      set: (val) => moment.utc(val).toDate(),
    },
    duration: {
      type: Number,
      required: true,
    },
    classId: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
    link: {
      type: "String",
      required: true,
    },
    teacherId: {
      type: "ObjectId",
      ref: "Teacher",
      required: true,
    },
    status: {
      type: "String",
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);
virtualRoomSchema.methods.updateStatus = async function () {
  const now = moment().add(2, "hours");
  const startTime = moment(this.startTime);
  const endTime = startTime.clone().add(this.duration, "minutes");
  if (now.isBefore(startTime)) {
    this.status = "upcoming";
  } else if (now.isBetween(startTime, endTime)) {
    this.status = "ongoing";
  } else {
    this.status = "completed";
  }

  await this.save();
};
const VirtualRoom = mongoose.model("VirtualRoom", virtualRoomSchema);

module.exports = VirtualRoom;
