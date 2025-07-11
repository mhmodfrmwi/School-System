const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    teacherId: {
      type: "ObjectId",
      ref: "Teacher",
      required: true,
    },
    startDate: {
      type: "Date",
      required: true,
    },
    endDate: {
      type: "Date",
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    fees: {
      type: Number,
      required: true,
    },
    requirements: {
      type: "String",
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
