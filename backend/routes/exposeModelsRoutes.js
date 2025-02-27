const express = require("express");
const {
  exposeModels,
} = require("../controllers/expose-models/exposeModelController");
const router = express.Router();
router.get("/:modelName", exposeModels);

module.exports = router;
