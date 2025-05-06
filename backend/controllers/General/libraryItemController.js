const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const libraryItemValidationSchema = require("../../validations/libraryItemValidation");
const LibraryItem = require("../../DB/LibraryItemModel");
const joi = require("joi");
const MaterialView = require("../../DB/MaterialViewModel");
const StudentLibraryItem = require("../../DB/Student-LibraryItemModel");
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

  const { title, author, libraryUrl, type } = req.body;

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
      uploaded_by: teacherId,
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
      type: joi.string().valid("Video", "PDF").optional(),
    })
    .min(1);

  const { error } = updateLibraryItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, author, libraryUrl, type } = req.body;

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
      return res.status(403).json({
        status: 403,
        message: "Unauthorized to update this Library item",
      });
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
      return res.status(403).json({
        status: 403,
        message: "Unauthorized to delete this Library item",
      });
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
    if (!req.user || !req.user.id) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    const filter = {};
    if (req.query.author) filter.author = req.query.author;
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
    const sort = validSortFields.includes(req.query.sort)
      ? req.query.sort
      : "-createdAt";

    const libraryItems = await LibraryItem.find(filter)
      .sort(sort)
      .populate("uploaded_by", "fullName");

    const totalItems = await LibraryItem.countDocuments(filter);

    if (libraryItems.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No library items found",
        libraryItems: [],
        totalItems,
      });
    }

    let enhancedLibraryItems;

    if (req.user.role === "student") {
      // For students: Add isViewed attribute
      const studentLibraryItems = await StudentLibraryItem.find({
        student_id: req.user.id,
        library_item_id: { $in: libraryItems.map((item) => item._id) },
      });

      enhancedLibraryItems = libraryItems.map((item) => {
        const isViewed = studentLibraryItems.some(
          (studentItem) =>
            studentItem.library_item_id.toString() === item._id.toString()
        );
        return {
          ...item.toObject(),
          isViewed,
        };
      });
    } else {
      // For non-students: Add views count attribute
      const libraryItemIds = libraryItems.map((item) => item._id);

      const viewCounts = await StudentLibraryItem.aggregate([
        { $match: { library_item_id: { $in: libraryItemIds } } },
        { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        viewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedLibraryItems = libraryItems.map((item) => ({
        ...item.toObject(),
        views: viewCountMap.get(item._id.toString()) || 0,
      }));
    }

    res.status(200).json({
      status: 200,
      message: "Library items retrieved successfully",
      libraryItems: enhancedLibraryItems,
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

  if (!req.user || !req.user.id) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }

  try {
    const libraryItem = await LibraryItem.findById(id)
      .select("title author item_url type")
      .populate("uploaded_by", "fullName");

    if (!libraryItem) {
      return res.status(404).json({
        status: 404,
        message: "Library item not found",
      });
    }

    let enhancedLibraryItem;

    if (req.user.role === "student") {
      // For students: Add isViewed attribute
      const isViewed = await StudentLibraryItem.findOne({
        student_id: req.user.id,
        library_item_id: id,
      });

      enhancedLibraryItem = {
        ...libraryItem.toObject(),
        isViewed: !!isViewed,
      };
    } else {
      // For non-students: Add views count attribute
      const viewCount = await StudentLibraryItem.countDocuments({
        library_item_id: id,
      });

      enhancedLibraryItem = {
        ...libraryItem.toObject(),
        views: viewCount,
      };
    }

    res.status(200).json({
      status: 200,
      message: "Library item retrieved successfully",
      libraryItem: enhancedLibraryItem,
    });
  } catch (error) {
    console.error("Error fetching library item by ID:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const getPublicLibraryTypePdf = expressAsyncHandler(async (req, res) => {
  try {
    const filter = { type: "PDF" };

    if (req.query.author) filter.author = req.query.author;
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
    const sort = validSortFields.includes(req.query.sort)
      ? req.query.sort
      : "-createdAt";

    const pdfItems = await LibraryItem.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("uploaded_by", "fullName");

    const totalItems = await LibraryItem.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    if (pdfItems.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No PDF library items found",
        libraryItems: [],
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      });
    }

    // Record views for logged-in users
    if (req.user && req.user.id) {
      const viewPromises = pdfItems.map(async (item) => {
        const existingView = await StudentLibraryItem.findOne({
          student_id: req.user.id,
          library_item_id: item._id,
        });

        if (!existingView) {
          await StudentLibraryItem.create({
            student_id: req.user.id,
            library_item_id: item._id,
          });

          await MaterialView.findOneAndUpdate(
            { material_id: item._id },
            { $inc: { view_count: 1 } },
            { upsert: true, new: true }
          );
        }
      });

      await Promise.all(viewPromises);
    }

    let enhancedPdfItems;

    if (req.user && req.user.role === "student") {
      // For students: Add isViewed attribute
      const studentLibraryItems = await StudentLibraryItem.find({
        student_id: req.user.id,
        library_item_id: { $in: pdfItems.map((item) => item._id) },
      });

      const viewedItemMap = new Map(
        studentLibraryItems.map((item) => [
          item.library_item_id.toString(),
          true,
        ])
      );

      enhancedPdfItems = pdfItems.map((item) => ({
        ...item.toObject(),
        isViewed: viewedItemMap.has(item._id.toString()),
      }));
    } else if (req.user && req.user.role !== "student") {
      // For non-students: Add views count attribute
      const pdfItemIds = pdfItems.map((item) => item._id);

      const viewCounts = await StudentLibraryItem.aggregate([
        { $match: { library_item_id: { $in: pdfItemIds } } },
        { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        viewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedPdfItems = pdfItems.map((item) => ({
        ...item.toObject(),
        views: viewCountMap.get(item._id.toString()) || 0,
      }));
    } else {
      // For non-logged in users, just return the items as is
      enhancedPdfItems = pdfItems;
    }

    res.status(200).json({
      status: 200,
      message: "PDF library items retrieved successfully",
      libraryItems: enhancedPdfItems,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching PDF library items:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const getPublicLibraryTypeVideo = expressAsyncHandler(async (req, res) => {
  try {
    const filter = { type: "Video" };

    if (req.query.author) filter.author = req.query.author;
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
    const sort = validSortFields.includes(req.query.sort)
      ? req.query.sort
      : "-createdAt";

    const videoItems = await LibraryItem.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("uploaded_by", "fullName");

    const totalItems = await LibraryItem.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    if (videoItems.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No Video library items found",
        libraryItems: [],
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      });
    }

    // Record views for logged-in users
    if (req.user && req.user.id) {
      const viewPromises = videoItems.map(async (item) => {
        const existingView = await StudentLibraryItem.findOne({
          student_id: req.user.id,
          library_item_id: item._id,
        });

        if (!existingView) {
          await StudentLibraryItem.create({
            student_id: req.user.id,
            library_item_id: item._id,
          });

          await MaterialView.findOneAndUpdate(
            { material_id: item._id },
            { $inc: { view_count: 1 } },
            { upsert: true, new: true }
          );
        }
      });

      await Promise.all(viewPromises);
    }

    let enhancedVideoItems;

    if (req.user && req.user.role === "student") {
      // For students: Add isViewed attribute
      const studentLibraryItems = await StudentLibraryItem.find({
        student_id: req.user.id,
        library_item_id: { $in: videoItems.map((item) => item._id) },
      });

      const viewedItemMap = new Map(
        studentLibraryItems.map((item) => [
          item.library_item_id.toString(),
          true,
        ])
      );

      enhancedVideoItems = videoItems.map((item) => ({
        ...item.toObject(),
        isViewed: viewedItemMap.has(item._id.toString()),
      }));
    } else if (req.user && req.user.role !== "student") {
      // For non-students: Add views count attribute
      const videoItemIds = videoItems.map((item) => item._id);

      const viewCounts = await StudentLibraryItem.aggregate([
        { $match: { library_item_id: { $in: videoItemIds } } },
        { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        viewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedVideoItems = videoItems.map((item) => ({
        ...item.toObject(),
        views: viewCountMap.get(item._id.toString()) || 0,
      }));
    } else {
      enhancedVideoItems = videoItems;
    }

    res.status(200).json({
      status: 200,
      message: "Video library items retrieved successfully",
      libraryItems: enhancedVideoItems,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching Video library items:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = {
  createLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
  getLibraryItems,
  getLibraryItemById,
  getPublicLibraryTypePdf,
  getPublicLibraryTypeVideo,
};
