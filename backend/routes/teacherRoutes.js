const express = require("express");
const { createMateriel } = require("../controllers/Teacher/materialController");
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
} = require("../controllers/Teacher/questionBankController");
const {
  createVirtualRoom,
  updateVirtualRoom,
  deleteVirtualRoom,
  getVirtualRoom,
  getAllVirtualRooms,
} = require("../controllers/Teacher/virtualRoomController");
const {
  createTrip,
  getTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
} = require("../controllers/Teacher/tripController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const router = express.Router();

router.post("/material", createMateriel);

router.post("/questionBank", createQuestion);
router
  .route("/questionBank/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);
router.get("/questionBank", getAllQuestions);

router.post("/virtualRoom", createVirtualRoom);
router
  .route("/virtualRoom/:id")
  .get(getVirtualRoom)
  .patch(updateVirtualRoom)
  .delete(deleteVirtualRoom);
router.get("/virtualRoom", getAllVirtualRooms);

router.post("/trip", createTrip);
router.route("/trip/:id").get(getTrip).patch(updateTrip).delete(deleteTrip);
router.get("/trip", getAllTrips);

router.post("/createAttendance", createStudentAttendance);
module.exports = router;
