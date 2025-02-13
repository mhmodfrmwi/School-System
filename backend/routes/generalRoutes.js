const express = require("express");
const validateJwt = require("../middlewares/validateJWT");
const {
  createLibraryItem,
  getLibraryItems,
  getLibraryItemById,
  updateLibraryItem,
  deleteLibraryItem,
} = require("../controllers/General/libraryItemController");
const router = express.Router();

router.post("/create-library-item", validateJwt, createLibraryItem);
router.get("/get-library-items", validateJwt, getLibraryItems);
router
  .route("/get-library-item/:id")
  .get(validateJwt, getLibraryItemById)
  .patch(validateJwt, updateLibraryItem)
  .delete(validateJwt, deleteLibraryItem);

module.exports = router;
