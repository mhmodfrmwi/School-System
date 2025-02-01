const Trip = require("../../DB/tripModel");
const expressAsyncHandler = require("express-async-handler");

const createTrip = expressAsyncHandler(async (req, res) => {
    const trip = new Trip({
        title: "Mountain Hiking Trip",
        teacherId: "67976ba2f6f371ca7d70bebc",
        startDate: "2025-03-15T08:00:00.000Z",
        endDate: "2025-03-20T18:00:00.000Z",
        numberOfSeats: 30,
        fees: 150,
        requirements: "Comfortable hiking gear, water bottle, and snacks"
    });
  await trip.save();
  res.status(201).json(trip);
});

// Get all trips
const getAllTrips = expressAsyncHandler(async (req, res) => {
  const trips = await Trip.find().populate("teacherId", "fullName");
  res.status(200).json(trips);
});
const getTrip = expressAsyncHandler(async (req, res) => {});
const updateTrip = expressAsyncHandler(async (req, res) => {});
const deleteTrip = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createTrip,
  getTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
};
