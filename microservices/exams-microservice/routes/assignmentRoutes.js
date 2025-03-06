const express = require("express");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignmentById,
  deleteAssignmentById,
} = require("../controllers/assignmentController");
const router = express.Router();

router.post("/create-assignment/:id", validateJwt, createAssignment);
router.get("/", validateJwt, getAssignments);
router.get("/:id", validateJwt, getAssignmentById);
router.patch("/:id", validateJwt, updateAssignmentById);
router.delete("/:id", validateJwt, deleteAssignmentById);

module.exports = router;
