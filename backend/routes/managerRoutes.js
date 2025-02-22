const express = require("express");
const {
  createSchoolHub,
  getAllSchoolHubs,
  updateSchoolHub,
  deleteSchoolHub,
  getContestStudents
} = require("../controllers/manager/SHController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login } = require("../controllers/auth/authManagerController");
const router = express.Router();

router.post("/login", login);
router
  .route("/schoolhub")
  .post(validateJwt, validateManager, createSchoolHub)
  .get(validateJwt, validateManager, getAllSchoolHubs)
router
  .route("/school-hub/:schoolHubId")
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);

router.get("/school-hub/:schoolHubId/participants", validateJwt, validateManager, getContestStudents);

module.exports = router;