const express = require("express");
const { createMateriel } = require("../controllers/Teacher/materialController");
const router = express.Router();

router.post("/material", createMateriel);

module.exports = router;