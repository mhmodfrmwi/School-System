const express = require("express");
const { Login, Register, hello } = require("../controllers/authController");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
module.exports = router;
