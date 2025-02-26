const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const AcademicYear = require("../../DB/academicYearModel");
const libraryItemForGradeValidationSchema = require("../../validations/libraryItemForGradeValidation");
const ClassTeacher = require("../../DB/classTeacherModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const LibraryItemsForGrade = require("../../DB/LibraryItemsForGrades");
const LibraryItem = require("../../DB/LibraryItem");
const StudentLibraryItem = require("../../DB/Student-LibraryItem");
const LibraryMaterialView = require("../../DB/libraryMaterialView");

const defaultFieldsToExclude = "-__v -createdAt -updatedAt";

const populateLibraryItem = (query) => {
  return query.populate("uploaded_by", "fullName").populate({
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
};

const validateRequest = (schema) =>
  expressAsyncHandler(async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    next();
  });

const createMaterialForLibrary = [
  validateRequest(libraryItemForGradeValidationSchema),
  expressAsyncHandler(async (req, res) => {
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
  }),
];

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
    const libraryItemForGrades = await LibraryItemsForGrade.find({})
      .select(defaultFieldsToExclude)
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
      })
      .lean();

    const transformedResponse = libraryItemForGrades.map((item) => ({
      id: item.grade_subject_semester_id._id,
      subject:
        item.grade_subject_semester_id.grade_subject_id.subjectId.subjectName,
      grade: item.grade_subject_semester_id.grade_subject_id.gradeId.gradeName,
      startYear:
        item.grade_subject_semester_id.grade_subject_id.academicYear_id
          .startYear,
      endYear:
        item.grade_subject_semester_id.grade_subject_id.academicYear_id.endYear,
      semester: item.grade_subject_semester_id.semester_id.semesterName,
    }));

    res.status(200).json({
      status: 200,
      message: "Subjects in the material of the library",
      subjects: transformedResponse,
    });
  }
);

const getMaterialsForLibraryWithGradeAndSemester = expressAsyncHandler(
  async (req, res) => {
    const { id: gradeSubjectSemesterId } = req.params;

    if (!validateObjectId(gradeSubjectSemesterId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid GradeSubjectSemester ID",
      });
    }

    const query = LibraryItemsForGrade.find({
      grade_subject_semester_id: gradeSubjectSemesterId,
    }).select(defaultFieldsToExclude);

    const materialInLibrary = await populateLibraryItem(query).lean();

    if (!materialInLibrary.length) {
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
  }
);

const getGeneralSubjectsThatHaveMaterialsInLibrary = expressAsyncHandler(
  async (req, res) => {
    const query = LibraryItemsForGrade.find().select(defaultFieldsToExclude);
    const subjectsInTheLibrary = await populateLibraryItem(query).lean();

    const transformedResponse = Array.from(
      new Map(
        subjectsInTheLibrary.map((item) => {
          const subject =
            item.grade_subject_semester_id.grade_subject_id.subjectId;
          return [
            subject._id.toString(),
            {
              id: subject._id,
              subject: subject.subjectName,
            },
          ];
        })
      ).values()
    );

    res.status(200).json({
      status: 200,
      message: "General subjects that have materials in the library",
      subjects: transformedResponse,
    });
  }
);

const getMaterialUsingTheIdOfTheGeneralSubjects = expressAsyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Subject ID",
      });
    }

    const query = LibraryItemsForGrade.find().select(defaultFieldsToExclude);
    const subjectsInTheLibrary = await populateLibraryItem(query).lean();

    const materials = subjectsInTheLibrary.filter(
      (subject) =>
        subject.grade_subject_semester_id.grade_subject_id.subjectId._id.toString() ===
        id
    );

    if (!materials.length) {
      return res.status(404).json({
        status: 404,
        message: "No materials found for this subject",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Materials for the subject",
      materials,
    });
  }
);

const getMaterialFromLibraryById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Material ID",
    });
  }

  const query = LibraryItemsForGrade.findById(id).select(
    defaultFieldsToExclude
  );
  const material = await populateLibraryItem(query).lean();

  if (!material) {
    return res.status(404).json({
      status: 404,
      message: "Material not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Material retrieved successfully",
    data: material,
  });
});

const getSubjectsThatHasMaterialTypePdf = expressAsyncHandler(
  async (req, res) => {
    const query = LibraryItemsForGrade.find({ type: "PDF" }).select(
      defaultFieldsToExclude
    );
    const materials = await populateLibraryItem(query).lean();

    const subjectsMap = new Map();
    materials.forEach((material) => {
      const subject =
        material.grade_subject_semester_id.grade_subject_id.subjectId;
      const subjectId = subject._id.toString();
      if (!subjectsMap.has(subjectId)) {
        subjectsMap.set(subjectId, {
          id: subjectId,
          subject: subject.subjectName,
        });
      }
    });

    const subjects = Array.from(subjectsMap.values());
    if (!subjects.length) {
      return res.status(404).json({
        status: 404,
        message: "No subjects found with PDF materials",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Subjects with PDF materials",
      subjects,
    });
  }
);
const getSubjectsThatHaveMaterialTypeVideo = expressAsyncHandler(
  async (req, res) => {
    const query = LibraryItemsForGrade.find({ type: "Video" }).select(
      defaultFieldsToExclude
    );
    const materials = await populateLibraryItem(query).lean();

    const subjectsMap = new Map();
    materials.forEach((material) => {
      const subject =
        material.grade_subject_semester_id.grade_subject_id.subjectId;
      const subjectId = subject._id.toString();
      if (!subjectsMap.has(subjectId)) {
        subjectsMap.set(subjectId, {
          id: subjectId,
          subject: subject.subjectName,
        });
      }
    });

    const subjects = Array.from(subjectsMap.values());
    if (!subjects.length) {
      return res.status(404).json({
        status: 404,
        message: "No subjects found with Video materials",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Subjects with Video materials",
      subjects,
    });
  }
);
const getMaterialOfSubjectThatOfTypePdf = expressAsyncHandler(
  async (req, res) => {
    const { id: subjectId } = req.params;

    if (!validateObjectId(subjectId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Subject ID",
      });
    }

    const query = LibraryItemsForGrade.find({
      type: "PDF",
    }).select(defaultFieldsToExclude);

    const subjectsInTheLibrary = await populateLibraryItem(query).lean();

    const materials = subjectsInTheLibrary.filter(
      (subject) =>
        subject.grade_subject_semester_id.grade_subject_id.subjectId._id.toString() ===
        subjectId
    );

    if (!materials.length) {
      return res.status(404).json({
        status: 404,
        message: "No materials found for this subject",
      });
    }

    let enhancedMaterials;

    if (req.user.role === "student") {
      const studentId = req.user.id;
      const materialIds = materials.map((material) => material._id);

      const viewedMaterials = await LibraryMaterialView.find({
        student_id: studentId,
        library_material_id: { $in: materialIds },
        is_viewed: true,
      });

      const viewedMaterialMap = new Map(
        viewedMaterials.map((viewed) => [
          viewed.library_material_id.toString(),
          true,
        ])
      );

      enhancedMaterials = materials.map((material) => ({
        ...material,
        isViewed: viewedMaterialMap.has(material._id.toString()),
      }));
    } else {
      const materialIds = materials.map((material) => material._id);

      const materialViewCounts = await LibraryMaterialView.aggregate([
        { $match: { library_material_id: { $in: materialIds } } },
        { $group: { _id: "$library_material_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        materialViewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedMaterials = materials.map((material) => ({
        ...material,
        views: viewCountMap.get(material._id.toString()) || 0,
      }));
    }

    res.status(200).json({
      status: 200,
      message: "PDF materials for the subject",
      materials: enhancedMaterials,
    });
  }
);

const getMaterialOfSubjectThatOfTypeVideo = expressAsyncHandler(
  async (req, res) => {
    const { id: subjectId } = req.params;

    if (!validateObjectId(subjectId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Subject ID",
      });
    }

    const query = LibraryItemsForGrade.find({
      type: "Video",
    }).select(defaultFieldsToExclude);

    const subjectsInTheLibrary = await populateLibraryItem(query).lean();

    const materials = subjectsInTheLibrary.filter(
      (subject) =>
        subject.grade_subject_semester_id.grade_subject_id.subjectId._id.toString() ===
        subjectId
    );

    if (!materials.length) {
      return res.status(404).json({
        status: 404,
        message: "No Video materials found for this subject",
      });
    }

    let enhancedMaterials;

    if (req.user.role === "student") {
      // For students: Add isViewed attribute
      const studentId = req.user.id;
      const materialIds = materials.map((material) => material._id);

      const viewedMaterials = await LibraryMaterialView.find({
        student_id: studentId,
        library_material_id: { $in: materialIds },
        is_viewed: true,
      });

      const viewedMaterialMap = new Map(
        viewedMaterials.map((viewed) => [
          viewed.library_material_id.toString(),
          true,
        ])
      );

      enhancedMaterials = materials.map((material) => ({
        ...material,
        isViewed: viewedMaterialMap.has(material._id.toString()),
      }));
    } else {
      const materialIds = materials.map((material) => material._id);

      const materialViewCounts = await LibraryMaterialView.aggregate([
        { $match: { library_material_id: { $in: materialIds } } },
        { $group: { _id: "$library_material_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        materialViewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedMaterials = materials.map((material) => ({
        ...material,
        views: viewCountMap.get(material._id.toString()) || 0,
      }));
    }

    res.status(200).json({
      status: 200,
      message: "Video materials for the subject",
      materials: enhancedMaterials,
    });
  }
);
const fetchAllGeneralAndMaterialVideos = expressAsyncHandler(
  async (req, res) => {
    const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
    const sort = validSortFields.includes(req.query.sort)
      ? req.query.sort
      : "-createdAt";

    const materialsQuery = LibraryItemsForGrade.find({ type: "Video" })
      .select(defaultFieldsToExclude)
      .sort(sort);
    const materialsFromLibrary = await populateLibraryItem(
      materialsQuery
    ).lean();

    const libraryItems = await LibraryItem.find({ type: "Video" })
      .select(defaultFieldsToExclude)
      .sort(sort)
      .populate("uploaded_by", "fullName");

    let enhancedMaterials, libraryItemsWithAttributes;

    if (req.user.role === "student") {
      const studentId = req.user.id;

      const materialIds = materialsFromLibrary.map((material) => material._id);
      const viewedMaterials = await LibraryMaterialView.find({
        student_id: studentId,
        library_material_id: { $in: materialIds },
        is_viewed: true,
      });
      const viewedMaterialMap = new Map(
        viewedMaterials.map((viewed) => [
          viewed.library_material_id.toString(),
          true,
        ])
      );
      enhancedMaterials = materialsFromLibrary.map((material) => ({
        ...material,
        isViewed: viewedMaterialMap.has(material._id.toString()),
      }));

      // Process library items
      const studentLibraryItems = await StudentLibraryItem.find({
        student_id: req.user.id,
        library_item_id: { $in: libraryItems.map((item) => item._id) },
      });
      libraryItemsWithAttributes = libraryItems.map((item) => {
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
      const materialIds = materialsFromLibrary.map((material) => material._id);
      const materialViewCounts = await LibraryMaterialView.aggregate([
        { $match: { library_material_id: { $in: materialIds } } },
        { $group: { _id: "$library_material_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        materialViewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedMaterials = materialsFromLibrary.map((material) => ({
        ...material,
        views: viewCountMap.get(material._id.toString()) || 0,
      }));

      const libraryItemIds = libraryItems.map((item) => item._id);
      const libraryViewCounts = await StudentLibraryItem.aggregate([
        { $match: { library_item_id: { $in: libraryItemIds } } },
        { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
      ]);

      const libraryViewCountMap = new Map(
        libraryViewCounts.map((item) => [item._id.toString(), item.views])
      );

      libraryItemsWithAttributes = libraryItems.map((item) => ({
        ...item.toObject(),
        views: libraryViewCountMap.get(item._id.toString()) || 0,
      }));
    }

    res.status(200).json({
      status: 200,
      message: "All general and material videos",
      LibraryItems: libraryItemsWithAttributes,
      materialsFromLibrary: enhancedMaterials,
    });
  }
);

const fetchAllGeneralAndMaterialPdf = expressAsyncHandler(async (req, res) => {
  const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
  const sort = validSortFields.includes(req.query.sort)
    ? req.query.sort
    : "-createdAt";

  const materialsQuery = LibraryItemsForGrade.find({ type: "PDF" })
    .select(defaultFieldsToExclude)
    .sort(sort);
  const materialsFromLibrary = await populateLibraryItem(materialsQuery).lean();

  const libraryItems = await LibraryItem.find({ type: "PDF" })
    .select(defaultFieldsToExclude)
    .sort(sort)
    .populate("uploaded_by", "fullName");

  let enhancedMaterials, libraryItemsWithAttributes;

  if (req.user.role === "student") {
    const studentId = req.user.id;

    const materialIds = materialsFromLibrary.map((material) => material._id);
    const viewedMaterials = await LibraryMaterialView.find({
      student_id: studentId,
      library_material_id: { $in: materialIds },
      is_viewed: true,
    });
    const viewedMaterialMap = new Map(
      viewedMaterials.map((viewed) => [
        viewed.library_material_id.toString(),
        true,
      ])
    );
    enhancedMaterials = materialsFromLibrary.map((material) => ({
      ...material,
      isViewed: viewedMaterialMap.has(material._id.toString()),
    }));

    const studentLibraryItems = await StudentLibraryItem.find({
      student_id: req.user.id,
      library_item_id: { $in: libraryItems.map((item) => item._id) },
    });
    libraryItemsWithAttributes = libraryItems.map((item) => {
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
    const materialIds = materialsFromLibrary.map((material) => material._id);
    const materialViewCounts = await LibraryMaterialView.aggregate([
      { $match: { library_material_id: { $in: materialIds } } },
      { $group: { _id: "$library_material_id", views: { $sum: 1 } } },
    ]);

    const viewCountMap = new Map(
      materialViewCounts.map((item) => [item._id.toString(), item.views])
    );

    enhancedMaterials = materialsFromLibrary.map((material) => ({
      ...material,
      views: viewCountMap.get(material._id.toString()) || 0,
    }));

    const libraryItemIds = libraryItems.map((item) => item._id);
    const libraryViewCounts = await StudentLibraryItem.aggregate([
      { $match: { library_item_id: { $in: libraryItemIds } } },
      { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
    ]);

    const libraryViewCountMap = new Map(
      libraryViewCounts.map((item) => [item._id.toString(), item.views])
    );

    libraryItemsWithAttributes = libraryItems.map((item) => ({
      ...item.toObject(),
      views: libraryViewCountMap.get(item._id.toString()) || 0,
    }));
  }

  res.status(200).json({
    status: 200,
    message: "All general and material PDFs",
    LibraryItems: libraryItemsWithAttributes,
    materialsFromLibrary: enhancedMaterials,
  });
});

const getAllGeneralAndMaterialTypeVideoAndPdf = expressAsyncHandler(
  async (req, res) => {
    const validSortFields = ["createdAt", "-createdAt", "title", "-title"];
    const sort = validSortFields.includes(req.query.sort)
      ? req.query.sort
      : "-createdAt";

    const materialsQuery = LibraryItemsForGrade.find()
      .select(defaultFieldsToExclude)
      .sort(sort);
    const materialsFromLibrary = await populateLibraryItem(
      materialsQuery
    ).lean();

    const libraryItems = await LibraryItem.find()
      .select(defaultFieldsToExclude)
      .sort(sort)
      .populate("uploaded_by", "fullName");

    let enhancedMaterials, libraryItemsWithAttributes;

    if (req.user.role === "student") {
      const studentId = req.user.id;

      const materialIds = materialsFromLibrary.map((material) => material._id);
      const viewedMaterials = await LibraryMaterialView.find({
        student_id: studentId,
        library_material_id: { $in: materialIds },
        is_viewed: true,
      });
      const viewedMaterialMap = new Map(
        viewedMaterials.map((viewed) => [
          viewed.library_material_id.toString(),
          true,
        ])
      );
      enhancedMaterials = materialsFromLibrary.map((material) => ({
        ...material,
        isViewed: viewedMaterialMap.has(material._id.toString()),
      }));

      const studentLibraryItems = await StudentLibraryItem.find({
        student_id: req.user.id,
        library_item_id: { $in: libraryItems.map((item) => item._id) },
      });
      libraryItemsWithAttributes = libraryItems.map((item) => {
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
      const materialIds = materialsFromLibrary.map((material) => material._id);
      const materialViewCounts = await LibraryMaterialView.aggregate([
        { $match: { library_material_id: { $in: materialIds } } },
        { $group: { _id: "$library_material_id", views: { $sum: 1 } } },
      ]);

      const viewCountMap = new Map(
        materialViewCounts.map((item) => [item._id.toString(), item.views])
      );

      enhancedMaterials = materialsFromLibrary.map((material) => ({
        ...material,
        views: viewCountMap.get(material._id.toString()) || 0,
      }));

      const libraryItemIds = libraryItems.map((item) => item._id);
      const libraryViewCounts = await StudentLibraryItem.aggregate([
        { $match: { library_item_id: { $in: libraryItemIds } } },
        { $group: { _id: "$library_item_id", views: { $sum: 1 } } },
      ]);

      const libraryViewCountMap = new Map(
        libraryViewCounts.map((item) => [item._id.toString(), item.views])
      );

      libraryItemsWithAttributes = libraryItems.map((item) => ({
        ...item.toObject(),
        views: libraryViewCountMap.get(item._id.toString()) || 0,
      }));
    }

    res.status(200).json({
      status: 200,
      message: "All general and material PDFs and Videos",
      LibraryItems: libraryItemsWithAttributes,
      materialsFromLibrary: enhancedMaterials,
    });
  }
);
module.exports = {
  createMaterialForLibrary,
  deleteMaterialForLibrary,
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
  getAllGeneralAndMaterialTypeVideoAndPdf,
};
