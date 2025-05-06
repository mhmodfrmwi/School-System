const Material = require("../DB/materielModel");
const GradeSubjectSemester = require("../DB/GradeSubjectSemesterModel");
const MaterialView = require("../DB/MaterialViewModel");
const student = require("../DB/StudentModel");
const BookMarkForMaterial = require("../DB/bookMarkForMaterialModel");
const getMaterialsForSubject = async (gradeSubjectSemesterId, userId) => {
  try {
    const gradeSubjectSemester = await GradeSubjectSemester.findById(
      gradeSubjectSemesterId
    ).populate("grade_subject_id");

    if (!gradeSubjectSemester) {
      return {
        status: 404,
        error: true,
        message: "Grade Subject Semester not found",
      };
    }

    const materials = await Material.find({
      grade_subject_semester_id: gradeSubjectSemester._id,
    })
      .populate({
        path: "grade_subject_semester_id",
        populate: [
          {
            path: "grade_subject_id",
            populate: [{ path: "subjectId" }, { path: "gradeId" }],
          },
        ],
      })
      .populate("uploaded_by");

    const materialsWithAttributes = await Promise.all(
      materials.map(async (material) => {
        const [isBookmarked, isViewed] = await Promise.all([
          BookMarkForMaterial.findOne({
            student_id: userId,
            material_id: material._id,
          }),
          MaterialView.findOne({
            student_id: userId,
            material_id: material._id,
          }),
        ]);

        return {
          ...material.toObject(),
          isBookmarked: !!isBookmarked,
          isViewed: !!isViewed,
        };
      })
    );
    return { materials: materialsWithAttributes };
  } catch (error) {
    console.error("Error in getMaterialsForSubject:", error);
    throw error;
  }
};

const getMaterialsForGrade = async (userId) => {
  try {
    const studentData = await student.findById(userId);
    const gradeId = studentData.gradeId;

    const materials = await Material.find({}).populate({
      path: "grade_subject_semester_id",
      populate: [
        {
          path: "grade_subject_id",
          populate: [{ path: "subjectId" }, { path: "gradeId" }],
        },
      ],
    });

    const filteredMaterialsByGrade = materials.filter((material) => {
      const gradeSubjectSemester = material.grade_subject_semester_id;
      return (
        gradeSubjectSemester &&
        gradeSubjectSemester.grade_subject_id &&
        gradeSubjectSemester.grade_subject_id.gradeId &&
        gradeSubjectSemester.grade_subject_id.gradeId._id.toString() ===
          gradeId.toString()
      );
    });

    const materialIds = filteredMaterialsByGrade.map((m) => m._id);
    const totalMaterialsCount = filteredMaterialsByGrade.length;

    // Get all views and bookmarks for this student
    const [viewedMaterials, bookmarkedMaterials] = await Promise.all([
      MaterialView.find({
        student_id: userId,
        material_id: { $in: materialIds },
      }),
      BookMarkForMaterial.find({
        student_id: userId,
        material_id: { $in: materialIds },
      }),
    ]);

    // Calculate unique counts (in case there are duplicate views/bookmarks)
    const uniqueViewedMaterialIds = [
      ...new Set(viewedMaterials.map((v) => v.material_id.toString())),
    ];
    const uniqueBookmarkedMaterialIds = [
      ...new Set(bookmarkedMaterials.map((b) => b.material_id.toString())),
    ];

    // Calculate percentages
    const viewedPercentage =
      totalMaterialsCount > 0
        ? Math.round(
            (uniqueViewedMaterialIds.length / totalMaterialsCount) * 100
          )
        : 0;

    const bookmarkedPercentage =
      totalMaterialsCount > 0
        ? Math.round(
            (uniqueBookmarkedMaterialIds.length / totalMaterialsCount) * 100
          )
        : 0;

    const materialsWithAttributes = await Promise.all(
      filteredMaterialsByGrade.map(async (material) => {
        const [isBookmarked, isViewed] = await Promise.all([
          BookMarkForMaterial.findOne({
            student_id: userId,
            material_id: material._id,
          }),
          MaterialView.findOne({
            student_id: userId,
            material_id: material._id,
          }),
        ]);

        return {
          ...material.toObject(),
          isBookmarked: !!isBookmarked,
          isViewed: !!isViewed,
        };
      })
    );

    return {
      materials: materialsWithAttributes,
      studentStats: {
        totalMaterials: totalMaterialsCount,
        materialsViewed: uniqueViewedMaterialIds.length,
        materialsBookmarked: uniqueBookmarkedMaterialIds.length,
        viewedPercentage,
        bookmarkedPercentage,
      },
    };
  } catch (error) {
    console.error("Error in getMaterialsForGrade:", error);
    throw error;
  }
};

module.exports = {
  getMaterialsForSubject,
  getMaterialsForGrade,
};
