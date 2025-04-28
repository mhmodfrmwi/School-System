const express = require("express");
const uploadImage = require("../utils/uploadProfileImages");

const { login ,updateParentProfile} = require("../controllers/auth/authParentController");
const {
  showKids,
  chooseKid,
} = require("../controllers/Parent/parentController");
const validateJwt = require("../middlewares/validateJWT");
const validateParent = require("../middlewares/validateParent");
const { getLoggedInParentData }= require("../controllers/Parent/parentData");
const router = express.Router();
router.post("/login", login);
router.patch(
  "/parent-profile",
  validateJwt, validateParent,
  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateParentProfile
);

router.get("/kids", validateJwt, validateParent, showKids);
router.post("/chooseKid", validateJwt, validateParent, chooseKid);
router.get("/parent-data", validateJwt, validateParent, getLoggedInParentData);

module.exports = router;


//module.exports = router;