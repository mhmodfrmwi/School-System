const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const libraryItemValidationSchema = require("../../validations/libraryItemValidation");
const LibraryItem = require("../../DB/LibraryItem");
const joi = require("joi");
const createLibraryItem = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }
  const { error } = libraryItemValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, author, libraryUrl,type } = req.body;

  try {
    const existingLibraryItem = await LibraryItem.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") },
      author: { $regex: new RegExp(`^${author}$`, "i") },
      item_url: libraryUrl,
    });

    if (existingLibraryItem) {
      return res.status(400).json({
        status: 400,
        message:
          "Library item with the same title, author, and URL already exists.",
        title: existingLibraryItem.title,
      });
    }

    const libraryItem = new LibraryItem({
      title,
      author,
      item_url: libraryUrl,
      type,
      uploaded_by:teacherId
    });

    await libraryItem.save();

    res.status(201).json({
      status: 201,
      message: "Library item created successfully",
      libraryItem,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const updateLibraryItem = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Library Item ID",
    });
  }

  const updateLibraryItemSchema = joi
    .object({
      title: joi.string().min(3).max(100).optional(),
      author: joi.string().min(3).max(100).optional(),
      libraryUrl: joi.string().uri().optional(),
      type: joi.string().valid("Video", "PDF").optional()
    })
    .min(1);

  const { error } = updateLibraryItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, author, libraryUrl,type } = req.body;

  try {
    if (title || author || libraryUrl || type) {
      const existingLibraryItem = await LibraryItem.findOne({
        title: title || { $exists: true },
        author: author || { $exists: true },
        item_url: libraryUrl || { $exists: true },
        type: type || { $exists: true },
        _id: { $ne: id },
      });
      
      if (existingLibraryItem) {
        return res.status(400).json({
          status: 400,
          message:
            "Library item with the same title, author, and URL already exists.",
        });
      }
    }
    const neededLibraryItem = await LibraryItem.findById(id);

    if (!neededLibraryItem) {
      return res.status(404).json({
        status: 404,
        message: "Library item not found",
      });
    }
    if (neededLibraryItem.uploaded_by.toString() !== teacherId) {
      return res.status(403).json({ status: 403, message: "Unauthorized to update this Library item" });
    }
    const updatedLibraryItem = await LibraryItem.findByIdAndUpdate(
      id,
      { title, author, item_url: libraryUrl, type },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Library item updated successfully",
      libraryItem: updatedLibraryItem,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const deleteLibraryItem = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Library Item ID",
    });
  }

  try {
    const neededLibraryItem = await LibraryItem.findById(id); 

    if (!neededLibraryItem) {
      return res.status(404).json({
        status: 404,
        message: "Library item not found",
      });
    }
    if (neededLibraryItem.uploaded_by.toString() !== teacherId) {
      return res.status(403).json({ status: 403, message: "Unauthorized to delete this Library item" });
    }

    const deletedLibraryItem = await LibraryItem.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Library item deleted successfully",
      deletedItem: deletedLibraryItem,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
const getLibraryItems = expressAsyncHandler(async (req, res) => {
  try {
    const filter = {};
    if (req.query.author) filter.author = req.query.author;
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const sort = req.query.sort || "-createdAt";

    const libraryItems = await LibraryItem.find(filter).sort(sort).populate("uploaded_by","fullName");

    const totalItems = await LibraryItem.countDocuments(filter);

    if (libraryItems.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No library items found",
        libraryItems: [],
        totalItems,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Library items retrieved successfully",
      libraryItems,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching library items:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
const getLibraryItemById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Library Item ID",
    });
  }

  try {
    const libraryItem = await LibraryItem.findById(id).select(
      "title author item_url type"
    ).populate("uploaded_by","fullName");

    if (!libraryItem) {
      return res.status(404).json({
        status: 404,
        message: "Library item not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Library item retrieved successfully",
      libraryItem,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
module.exports = {
  createLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
  getLibraryItems,
  getLibraryItemById,
};
