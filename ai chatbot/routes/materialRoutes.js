const express = require("express");
const { extractToken } = require("../middleware/auth");
const { getMaterial } = require("../controllers/materialController");
const router = express.Router();

router.get("/", extractToken, getMaterial);
module.exports = router;
