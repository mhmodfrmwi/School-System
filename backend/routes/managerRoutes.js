const express = require("express");
const {
  createSchoolHub,
  getAllSchoolHubs,
  getSchoolHub,
  updateSchoolHub,
  deleteSchoolHub,
} = require("../controllers/manager/SHController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login } = require("../controllers/auth/authManagerController");
const {createVirtualRoom} = require("../controllers/Teacher/virtualRoomController")
const router = express.Router();

router.post("/login", login);
router.post("/schoolhub", createSchoolHub); // ✅ Correct POST route

router
  .route("/school-hub/:id")
  .get(validateJwt, validateManager, getSchoolHub)
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);

router.get("/school-hub", validateJwt, validateManager, getAllSchoolHubs); // ✅ Correct GET route

module.exports = router;

/*const express = require("express");
const {
  createSchoolHub,
  getAllSchoolHubs,
  getSchoolHub,
  updateSchoolHub,
  deleteSchoolHub,
  getAllSchoolHubs2
} = require("../controllers/manager/SHController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login } = require("../controllers/auth/authManagerController");
const router = express.Router();
router.post("/login", login);
router.post("/school-hub", validateJwt, validateManager, createSchoolHub);
router.get("/school-hub", validateJwt, validateManager, getAllSchoolHubs2);
router
  .route("/school-hub/:id")
  .get(validateJwt, validateManager, getSchoolHub)
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);
//router.get("/school-hub", validateJwt, validateManager, getAllSchoolHubs);

module.exports = router;
*/