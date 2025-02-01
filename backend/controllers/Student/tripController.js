const Trip = require("../../DB/tripModel");
const expressAsyncHandler = require("express-async-handler");

const getAllTrips = expressAsyncHandler(async (req, res) => {
  const trips = await Trip.find().populate("teacherId", "fullName");
  res.status(200).json(trips);
});

module.exports = {
  getAllTrips,
};