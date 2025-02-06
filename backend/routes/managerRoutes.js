const express = require("express");
const {
  createContest,
  getAllContests,
  getContest,
  updateContest,
  deleteContest,
} = require("../controllers/manager/contestController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login } = require("../controllers/auth/authManagerController");
const router = express.Router();
router.post("/login", login);
router.post("/contest", validateJwt, validateManager, createContest);
router
  .route("/contest/:id")
  .get(validateJwt, validateManager, getContest)
  .patch(validateJwt, validateManager, updateContest)
  .delete(validateJwt, validateManager, deleteContest);
router.get("/contest", validateJwt, validateManager, getAllContests);

module.exports = router;
