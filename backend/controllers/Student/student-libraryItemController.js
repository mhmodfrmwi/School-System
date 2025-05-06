const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const LibraryItem = require("../../DB/LibraryItemModel");
const StudentLibraryItem = require("../../DB/Student-LibraryItemModel");
const moment = require("moment");
const updateLastUserViewForLibraryItem = expressAsyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Library Item ID" });
    }

    const libraryItem = await LibraryItem.findById(id);
    if (!libraryItem) {
      return res
        .status(404)
        .json({ status: 404, message: "Library Item not found" });
    }

    const student_id = req.user.id;

    try {
      const studentLibraryItemView = await StudentLibraryItem.findOneAndUpdate(
        { library_item_id: id, student_id },
        { last_view_date: moment().format("YYYY-MM-DD HH:mm:ss") },
        { upsert: true, new: true }
      );

      res.status(200).json({
        status: 200,
        message: "Book viewed successfully",
        studentLibraryItemView,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
);

const getLibraryItemsViewsForStudent = expressAsyncHandler(async (req, res) => {
  const student_id = req.user.id;

  try {
    const studentLibraryItemViews = await StudentLibraryItem.find({
      student_id,
    });

    if (studentLibraryItemViews.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No library items found for the student",
        libraryItems: [],
      });
    }

    const libraryItems = await LibraryItem.find({
      _id: { $in: studentLibraryItemViews.map((view) => view.library_item_id) },
    });

    const libraryItemsWithViewDates = libraryItems.map((item) => {
      const viewRecord = studentLibraryItemViews.find(
        (view) => view.library_item_id.toString() === item._id.toString()
      );
      return {
        ...item.toObject(),
        last_view_date: viewRecord ? viewRecord.last_view_date : null,
      };
    });

    res.status(200).json({
      status: 200,
      message: "Library items for student retrieved successfully",
      libraryItems: libraryItemsWithViewDates,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = {
  updateLastUserViewForLibraryItem,
  getLibraryItemsViewsForStudent,
};
