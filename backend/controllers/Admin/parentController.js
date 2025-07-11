const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const parentValidationSchema = require("../../validations/parentValidation");
const Parent = require("../../DB/ParentModel");
const hashPassword = require("../../utils/hashPassword");
const { createParentStudent } = require("./parentStudentController");
const ParentStudent = require("../../DB/ParentStudentModel");
const { createVerificationToken } = require("../../utils/verificationToken");

const createParent = expressAsyncHandler(async (req, res) => {
  const { error } = parentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingParent = await Parent.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingParent) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const parent = new Parent({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    gender: req.body.gender,
  });
  try {
    await parent.save();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }

  const studentsAcademicNumbers = req.body.students;
  if (!Array.isArray(studentsAcademicNumbers)) {
    return res.status(400).json({
      status: 400,
      message: "studentsAcademicNumbers must be an array",
    });
  }

  try {
    const parentStudents = await Promise.all(
      studentsAcademicNumbers.map(async (studentAcademicNumber) => {
        return await createParentStudent(parent._id, studentAcademicNumber);
      })
    );
    const message = await createVerificationToken(
      parent._id,
      "Parent",
      parent.email
    );
    res.status(201).json({
      status: 201,
      message,
      parent,
      parentStudents,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

const updateParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent ID",
    });
  }

  const { error } = parentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  try {
    const existingParent = await Parent.findOne({
      _id: { $ne: id },
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingParent) {
      return res.status(400).json({
        status: 400,
        message: "Email or phone number already exists",
      });
    }

    const updatedFields = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
    };

    if (req.body.password) {
      updatedFields.password = await hashPassword(req.body.password);
    }

    const parent = await Parent.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!parent) {
      return res.status(404).json({
        status: 404,
        message: "Parent not found",
      });
    }

    const studentsAcademicNumbers = req.body.students || [];

    if (!Array.isArray(studentsAcademicNumbers)) {
      return res.status(400).json({
        status: 400,
        message: "students must be an array",
      });
    }

    await ParentStudent.deleteMany({ parent_id: parent._id });

    let parentStudents = [];

    if (studentsAcademicNumbers.length > 0) {
      try {
        parentStudents = await Promise.all(
          studentsAcademicNumbers.map(async (studentAcademicNumber) => {
            return await createParentStudent(parent._id, studentAcademicNumber);
          })
        );

        return res.status(200).json({
          status: 200,
          message: "Parent updated successfully with new student associations",
          parent,
          parentStudents,
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }
    }

    res.status(200).json({
      status: 200,
      message:
        "Parent updated successfully with all student associations removed",
      parent,
      parentStudents,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

const deleteParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent ID",
    });
  }

  const parent = await Parent.findByIdAndDelete(id);
  if (!parent) {
    return res.status(404).json({
      status: 404,
      message: "Parent not found",
    });
  }

  try {
    await ParentStudent.deleteMany({ parent_id: id });

    res.status(200).json({
      status: 200,
      message: "Parent and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete parent or related records",
      error: error.message,
    });
  }
});

const getParent = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Parent ID",
      });
    }

    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({
        status: 404,
        message: "Parent not found",
      });
    }
    const parentStudents = await ParentStudent.find({ parent_id: id }, [
      "-parent_id",
    ]).populate({
      path: "student_id",
      populate: [
        { path: "gradeId" },
        { path: "classId" },
        { path: "academicYear_id" },
      ],
    });
    res.status(200).json({
      status: 200,
      message: "Parent retrieved successfully",
      parent,
      students: parentStudents,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.status(500).json({ message: `Failed ${error.message}` });
  }
});

const getAllParent = expressAsyncHandler(async (req, res) => {
  try {
    const parents = await Parent.find();

    const parentsWithStudents = await Promise.all(
      parents.map(async (parent) => {
        const parentStudents = await ParentStudent.find(
          { parent_id: parent._id },
          { parent_id: 0 }
        ).populate({
          path: "student_id",
          populate: [
            { path: "gradeId" },
            { path: "classId" },
            { path: "academicYear_id" },
          ],
        });
        return {
          ...parent.toObject(),
          parentStudents,
        };
      })
    );

    res.status(200).json({
      status: 200,
      message: "Parents retrieved successfully",
      parents: parentsWithStudents,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.status(500).json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createParent,
  updateParent,
  deleteParent,
  getParent,
  getAllParent,
};
