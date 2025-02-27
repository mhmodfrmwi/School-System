const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const MaterialView = require("../../DB/MaterialView");
const moment = require("moment");
const LibraryMaterialView = require("../../DB/libraryMaterialView");
const LibraryItemsForGrade = require("../../DB/LibraryItemsForGrades");

const defaultFieldsToExclude = "-__v -createdAt -updatedAt";

const updateLibraryMaterialView = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Library Material ID" });
  }

  const student_id = req.user.id;
  try {
    let materialView = await LibraryMaterialView.findOne({
      library_material_id: id,
      student_id,
    });

    if (!materialView || !materialView.is_viewed) {
      await addRewardClaimAndUpdatePoints(student_id, "Student", "View Library Item");
    }
    materialView = await LibraryMaterialView.findOneAndUpdate(
      { library_material_id: id, student_id },
      { is_viewed: true, last_view_at: moment().format("YYYY-MM-DD HH:mm:ss") },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ status: 200, message: "Library Material viewed successfully" });
  } catch (error) {
    console.error("Error updating Library material view:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const getLibraryMaterialViewByMaterialId = expressAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Library Material ID" });
    }

    const student_id = req.user.id;

    try {
      const materialView = await LibraryMaterialView.findOne({
        library_material_id: id,
        student_id,
      });

      if (!materialView) {
        return res.status(404).json({
          status: 404,
          message: "Library Material view not found",
          material_id: id,
          student_id,
        });
      }

      res.status(200).json({
        status: 200,
        isViewed: materialView.is_viewed,
        lastViewedAt: materialView.last_view_at,
      });
    } catch (error) {
      console.error("Error fetching Library material view:", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
);

const getLibraryMaterialViewsForStudent = expressAsyncHandler(
  async (req, res) => {
    const student_id = req.user.id;

    try {
      const studentLibraryMaterialViews = await LibraryMaterialView.find({
        student_id,
      });

      if (studentLibraryMaterialViews.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "No library material found for the student",
          libraryMaterial: [],
        });
      }

      const libraryMaterials = await LibraryItemsForGrade.find({
        _id: {
          $in: studentLibraryMaterialViews.map(
            (view) => view.library_material_id
          ),
        },
      })
        .populate("uploaded_by", "fullName")
        .populate({
          path: "grade_subject_semester_id",
          populate: [
            {
              path: "grade_subject_id",
              populate: [
                { path: "subjectId", select: "subjectName _id" },
                { path: "gradeId", select: defaultFieldsToExclude },
              ],
              select: `${defaultFieldsToExclude} -academicYear_id`,
            },
            {
              path: "semester_id",
              populate: {
                path: "academicYear_id",
                select: defaultFieldsToExclude,
              },
              select: defaultFieldsToExclude,
            },
          ],
          select: defaultFieldsToExclude,
        });

      const libraryItemsWithViewDates = libraryMaterials.map((item) => {
        const viewRecord = studentLibraryMaterialViews.find(
          (view) => view.library_material_id.toString() === item._id.toString()
        );

        return {
          ...item.toObject(),
          last_view_date: viewRecord ? viewRecord.last_view_date : null,
        };
      });

      res.status(200).json({
        status: 200,
        message: "Library materials for student retrieved successfully",
        libraryMaterials: libraryItemsWithViewDates,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }
);
module.exports = {
  updateLibraryMaterialView,
  getLibraryMaterialViewByMaterialId,
  getLibraryMaterialViewsForStudent,
};
