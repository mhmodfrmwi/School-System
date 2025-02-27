const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolHubSchema = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    registrationStart: {
      type: "Date",
      required: true,
    },
    registrationEnd: {
      type: "Date",
      required: true,
    },
    contestDate: {
      type: "Date",
      required: true,
    },
    location: {
      type: "String",
      required: true,
    },
    details: {
      type: "String",
      required: true,
    },
    prizes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const SchoolHub = mongoose.model("SchoolHub", schoolHubSchema);

module.exports = SchoolHub;
