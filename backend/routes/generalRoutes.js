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
  getMaterialFromLibraryById,
  getSubjectsThatHasMaterialTypePdf,
  getSubjectsThatHaveMaterialTypeVideo,
  getMaterialOfSubjectThatOfTypePdf,
  getMaterialOfSubjectThatOfTypeVideo,
  fetchAllGeneralAndMaterialVideos,
  fetchAllGeneralAndMaterialPdf,
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
router.get(
  "/get-material-from-library/:id",
  validateJwt,
  getMaterialFromLibraryById
);

router.get(
  "/fetch-subjects-that-has-material-type-pdf",
  validateJwt,
  getSubjectsThatHasMaterialTypePdf
);
router.get(
  "/fetch-subjects-that-have-material-type-video",
  validateJwt,
  getSubjectsThatHaveMaterialTypeVideo
);
router.get(
  "/fetch-material-of-subject-that-of-type-pdf/:id",
  validateJwt,
  getMaterialOfSubjectThatOfTypePdf
);
router.get(
  "/fetch-material-of-subject-that-of-type-video/:id",
  validateJwt,
  getMaterialOfSubjectThatOfTypeVideo
);
router.get(
  "/fetch-all-general-and-material-videos",
  validateJwt,
  fetchAllGeneralAndMaterialVideos
);
router.get(
  "/fetch-all-general-and-material-pdf",
  validateJwt,
  fetchAllGeneralAndMaterialPdf
);
module.exports = router;
