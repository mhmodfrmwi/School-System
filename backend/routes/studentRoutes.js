const express = require("express");
const authStudentConttroller = require("../controllers/authStudentController");


const router = express.Router();
router.route('/login').post(authStudentConttroller.login);



module.exports = router;