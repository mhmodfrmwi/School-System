const express = require("express");
const validateJwt = require("../middlewares/validateJWT");
const {
  createLibraryItem,
  getLibraryItems,
  getLibraryItemById,
  updateLibraryItem,
  deleteLibraryItem,
} = require("../controllers/General/libraryItemController");
const {
  displaySubjectsInTheMaterialOfTheLibrary,
  getMaterialsForLibraryWithGradeAndSemester,
  getGeneralSubjectsThatHaveMaterialsInLibrary,
  getMaterialUsingTheIdOfTheGeneralSubjects,
} = require("../controllers/Teacher/MatrialForLibrary");
const router = express.Router();

router.post("/create-library-item", validateJwt, createLibraryItem);
router.get("/get-library-items", validateJwt, getLibraryItems);
router
  .route("/get-library-item/:id")
  .get(validateJwt, getLibraryItemById)
  .patch(validateJwt, updateLibraryItem)
  .delete(validateJwt, deleteLibraryItem);

router.get(
  "/get-subjects-in-library",
  validateJwt,
  displaySubjectsInTheMaterialOfTheLibrary
);

router.get(
  "/get-material-for-subject-in-library/:id",
  validateJwt,
  getMaterialsForLibraryWithGradeAndSemester
);

router.get(
  "/get-general-subjects-in-library",
  validateJwt,
  getGeneralSubjectsThatHaveMaterialsInLibrary
);

router.get(
  "/get-material-for-general-subject-in-library/:id",
  validateJwt,
  getMaterialUsingTheIdOfTheGeneralSubjects
);
module.exports = router;
