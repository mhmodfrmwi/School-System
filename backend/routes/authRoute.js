const express = require("express");
const { Login, Register, hello } = require("../controllers/authController");
const router = express.Router();

router.get("/login", Login);
router.post("/register", Register);
module.exports = router;
