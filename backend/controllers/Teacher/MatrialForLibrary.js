const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const AcademicYear = require("../../DB/academicYearModel");
const libraryItemForGradeValidationSchema = require("../../validations/libraryItemForGradeValidation");
const ClassTeacher = require("../../DB/classTeacherModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const LibraryItemsForGrade = require("../../DB/LibraryItemsForGrades");

const createMaterialForLibrary = expressAsyncHandler(async (req, res) => {
  const { error } = libraryItemForGradeValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, itemUrl, description, type, gradeSubjectSemesterId } =
    req.body;

  const gradeSubjectSemesterExists = await GradeSubjectSemester.findOne({
    _id: gradeSubjectSemesterId,
  }).populate("grade_subject_id", "gradeId");

  if (!gradeSubjectSemesterExists) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found.",
    });
  }

  const libraryItemsForGrade = new LibraryItemsForGrade({
    title: title.trim(),
    item_url: itemUrl.trim(),
    description: description.trim(),
    type,
    grade_subject_semester_id: gradeSubjectSemesterId,
    uploaded_by: req.user.id,
  });

  await libraryItemsForGrade.save();

  res.status(201).json({
    status: 201,
    message: "Material added successfully.",
    data: libraryItemsForGrade,
  });
});

const deleteMaterialForLibrary = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Material ID",
    });
  }

  const libraryItemForGrade = await LibraryItemsForGrade.findById(id);
  if (!libraryItemForGrade) {
    return res.status(404).json({
      status: 404,
      message: "Material not found",
    });
  }

  await LibraryItemsForGrade.findByIdAndDelete(id);

  res.status(200).json({
    status: 200,
    message: "Material deleted successfully",
    data: {
      id: libraryItemForGrade._id,
      title: libraryItemForGrade.title,
    },
  });
});

const displaySubjectsInTheMaterialOfTheLibrary = expressAsyncHandler(
  async (req, res) => {
    try {
      const libraryItemForGrades = await LibraryItemsForGrade.find({})
        .select("-createdAt -updatedAt -__v")
        .populate({
          path: "grade_subject_semester_id",
          populate: [
            {
              path: "grade_subject_id",
              populate: [
                { path: "gradeId", select: "gradeName" },
                { path: "subjectId", select: "subjectName" },
                { path: "academicYear_id", select: "startYear endYear" },
              ],
            },
            {
              path: "semester_id",
              select: "semesterName",
            },
          ],
        });

      const transformedResponse = libraryItemForGrades.map((item) => ({
        id: item.grade_subject_semester_id._id,
        subject:
          item.grade_subject_semester_id.grade_subject_id.subjectId.subjectName,
        grade:
          item.grade_subject_semester_id.grade_subject_id.gradeId.gradeName,
        startYear:
          item.grade_subject_semester_id.grade_subject_id.academicYear_id
            .startYear,
        endYear:
          item.grade_subject_semester_id.grade_subject_id.academicYear_id
            .endYear,
        semester: item.grade_subject_semester_id.semester_id.semesterName,
      }));

      res.status(200).json({
        status: 200,
        message: "Subjects in the material of the library",
        subjects: transformedResponse,
      });
    } catch (error) {
      console.error("Error fetching library items:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);
const getMaterialsForLibraryWithGradeAndSemester = expressAsyncHandler(
  async (req, res) => {
    const gradeSubjectSemesterId = req.params.id;

    if (!validateObjectId(gradeSubjectSemesterId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid GradeSubjectSemester ID",
      });
    }

    try {
      const materialInLibrary = await LibraryItemsForGrade.find({
        grade_subject_semester_id: gradeSubjectSemesterId,
      })
        .select("-createdAt -updatedAt -__v")
        .populate({
          path: "grade_subject_semester_id",
          populate: [
            {
              path: "grade_subject_id",
              populate: [
                { path: "gradeId", select: "gradeName" },
                { path: "subjectId", select: "subjectName" },
                { path: "academicYear_id", select: "startYear endYear" },
              ],
            },
            {
              path: "semester_id",
              select: "semesterName",
            },
          ],
        });

      if (materialInLibrary.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No materials found for this GradeSubjectSemester",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Materials in the library",
        materials: materialInLibrary,
      });
    } catch (error) {
      console.error("Error fetching materials:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

module.exports = {
  createMaterialForLibrary,
  deleteMaterialForLibrary,
  displaySubjectsInTheMaterialOfTheLibrary,
  getMaterialsForLibraryWithGradeAndSemester,
};
