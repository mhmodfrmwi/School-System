const express = require("express");
const { login } = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");

const router = express.Router();
router.route("/login").post(login);

module.exports = router;
