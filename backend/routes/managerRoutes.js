const express = require("express");
const {
    createContest,
    getAllContests,
    getContest,
    updateContest,
    deleteContest,
}= require("../controllers/manager/contestController");

const router = express.Router();

router.post("/contest", createContest);
router
  .route("/contest/:id")
  .get(getContest)
  .patch(updateContest)
  .delete(deleteContest);
router.get("/contest", getAllContests);

module.exports = router;