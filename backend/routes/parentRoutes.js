const express = require("express");
const { login } = require("../controllers/auth/authParentController");
const {
  showKids,
  chooseKid,
} = require("../controllers/Parent/parentController");
const validateJwt = require("../middlewares/validateJWT");
const validateParent = require("../middlewares/validateParent");
const router = express.Router();
router.post("/login", login);

router.get("/kids", validateJwt, validateParent, showKids);
router.post("/chooseKid", validateJwt, validateParent, chooseKid);
module.exports = router;
