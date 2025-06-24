const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const validateObjectId = require("../../utils/validateObjectId");
const studentValidationSchema = require("../../validations/studentValidation");
const Student = require("../../DB/StudentModel");
const Grade = require("../../DB/gradeModel");
const Class = require("../../DB/classModel");
const AcademicYear = require("../../DB/academicYearModel");
const hashPassword = require("../../utils/hashPassword");
const Attendance = require("../../DB/attendanceModel");
const { getStudentById } = require("../../services/studentService");
const { createVerificationToken } = require("../../utils/verificationToken");

const generateAcademicNumber = async () => {
  const currentYear = moment().year().toString().slice(-2);

  const lastStudent = await Student.findOne({
    academic_number: { $regex: `^${currentYear}` },
  }).sort({ academic_number: -1 });

  let sequenceNumber = 1;

  if (lastStudent) {
    const lastNumber = lastStudent.academic_number.slice(2);
    sequenceNumber = parseInt(lastNumber, 10) + 1;
  }

  return `${currentYear}${String(sequenceNumber).padStart(4, "0")}`;
};

async function createClass(gradeId, academicYearId, className) {
  const newClass = new Class({
    className,
    gradeId,
    academicYear_id: academicYearId,
  });

  await newClass.save();
  return newClass;
}

// Modified createStudent - No longer assigns to class
const createStudent = expressAsyncHandler(async (req, res) => {
  const { error } = studentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const {
    fullName,
    emailAddress,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    grade,
    address,
  } = req.body;

  const existingStudent = await Student.findOne({
    $or: [{ email: emailAddress }, { phone: phoneNumber }],
  });

  if (existingStudent) {
    return res.status(400).json({
      status: 400,
      message: "Student with the same email or phone number already exists.",
    });
  }

  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  let startYear;
  if (currentMonth >= 9) {
    startYear = currentYear;
  } else {
    startYear = currentYear - 1;
  }

  const academicYearRecord = await AcademicYear.findOne({ startYear });

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const academicNumber = await generateAcademicNumber();

  const gradeRecord = await Grade.findOne({ gradeName: grade });

  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const admissionDate = moment().toDate();

  const newStudent = new Student({
    academic_number: academicNumber,
    fullName,
    dateOfBirth,
    gender,
    address,
    phone: phoneNumber,
    email: emailAddress,
    admission_date: admissionDate,
    password: await hashPassword(password),
    gradeId: gradeRecord._id,
    classId: null, // No class assignment initially
    academicYear_id: academicYearRecord._id,
  });

  await newStudent.save();

  const message = await createVerificationToken(
    newStudent._id,
    "Student",
    newStudent.email
  );

  res.status(201).json({
    status: 201,
    message,
    student: newStudent,
  });
});

// New controller for assigning students to classes
const assignStudentsToClasses = expressAsyncHandler(async (req, res) => {
  const {
    gradeId,
    academicYearId,
    assignmentMethod,
    classSize = 30,
  } = req.body;

  // Validate required fields
  if (!gradeId || !academicYearId || !assignmentMethod) {
    return res.status(400).json({
      status: 400,
      message: "Grade ID, Academic Year ID, and Assignment Method are required",
    });
  }

  // Validate ObjectIds
  if (!validateObjectId(gradeId) || !validateObjectId(academicYearId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade ID or Academic Year ID",
    });
  }

  // Validate assignment method
  const validMethods = ["alphabetical", "gender", "dateOfBirth"];
  if (!validMethods.includes(assignmentMethod)) {
    return res.status(400).json({
      status: 400,
      message:
        "Invalid assignment method. Valid methods are: alphabetical, gender, dateOfBirth",
    });
  }

  try {
    // Get students without class assignment for the specified grade and academic year
    const unassignedStudents = await Student.find({
      gradeId: gradeId,
      academicYear_id: academicYearId,
      classId: null,
    });

    if (unassignedStudents.length === 0) {
      return res.status(404).json({
        status: 404,
        message:
          "No unassigned students found for the specified grade and academic year",
      });
    }

    // Sort students based on assignment method
    let sortedStudents;
    switch (assignmentMethod) {
      case "alphabetical":
        sortedStudents = unassignedStudents.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        break;

      case "gender":
        sortedStudents = unassignedStudents.sort((a, b) => {
          if (a.gender === b.gender) {
            return a.fullName.localeCompare(b.fullName); // Secondary sort by name
          }
          return a.gender.localeCompare(b.gender);
        });
        break;

      case "dateOfBirth":
        sortedStudents = unassignedStudents.sort((a, b) => {
          const dateA = new Date(a.dateOfBirth);
          const dateB = new Date(b.dateOfBirth);
          if (dateA.getTime() === dateB.getTime()) {
            return a.fullName.localeCompare(b.fullName); // Secondary sort by name
          }
          return dateA - dateB; // Youngest first
        });
        break;
    }

    // Get existing classes for this grade and academic year
    let existingClasses = await Class.find({
      gradeId: gradeId,
      academicYear_id: academicYearId,
    }).sort({ className: 1 });

    // Create classes and assign students
    let currentClassIndex = 0;
    let currentClass = existingClasses[currentClassIndex];
    let currentClassStudentCount = currentClass
      ? currentClass.student_count || 0
      : 0;
    const assignmentResults = [];

    for (let i = 0; i < sortedStudents.length; i++) {
      const student = sortedStudents[i];

      // Check if we need a new class
      if (!currentClass || currentClassStudentCount >= classSize) {
        currentClassIndex++;

        if (currentClassIndex < existingClasses.length) {
          // Use existing class
          currentClass = existingClasses[currentClassIndex];
          currentClassStudentCount = currentClass.student_count || 0;
        } else {
          // Create new class
          const newClassName = `Class ${currentClassIndex + 1}`;
          currentClass = await createClass(
            gradeId,
            academicYearId,
            newClassName
          );
          existingClasses.push(currentClass);
          currentClassStudentCount = 0;
        }
      }

      // Assign student to current class
      await Student.findByIdAndUpdate(student._id, {
        classId: currentClass._id,
      });

      // Update class student count
      await Class.findByIdAndUpdate(currentClass._id, {
        $inc: { student_count: 1 },
      });

      currentClassStudentCount++;

      assignmentResults.push({
        studentId: student._id,
        studentName: student.fullName,
        classId: currentClass._id,
        className: currentClass.className,
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully assigned ${sortedStudents.length} students to classes using ${assignmentMethod} method`,
      assignmentMethod,
      totalStudentsAssigned: sortedStudents.length,
      classesUsed: existingClasses.length,
      assignments: assignmentResults,
    });
  } catch (error) {
    console.error("Error assigning students to classes:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to assign students to classes",
      error: error.message,
    });
  }
});

// Get unassigned students for a specific grade and academic year
const getUnassignedStudents = expressAsyncHandler(async (req, res) => {
  const { gradeId, academicYearId } = req.query;
  console.log("Grade ID:", gradeId, "Academic Year ID:", academicYearId);

  if (!gradeId || !academicYearId) {
    return res.status(400).json({
      status: 400,
      message: "Grade ID and Academic Year ID are required",
    });
  }

  if (!validateObjectId(gradeId) || !validateObjectId(academicYearId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade ID or Academic Year ID",
    });
  }

  try {
    const unassignedStudents = await Student.find({
      gradeId: gradeId,
      academicYear_id: academicYearId,
      classId: null,
    })
      .populate("gradeId", "gradeName")
      .populate("academicYear_id", "startYear");

    res.status(200).json({
      status: 200,
      message: "Unassigned students retrieved successfully",
      count: unassignedStudents.length,
      students: unassignedStudents,
    });
  } catch (error) {
    console.error("Error getting unassigned students:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve unassigned students",
      error: error.message,
    });
  }
});

const updateStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Student ID",
    });
  }

  const { error } = studentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const {
    fullName,
    emailAddress,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    grade,
    address,
  } = req.body;

  const existingStudent = await Student.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: emailAddress }, { phone: phoneNumber }] },
    ],
  });

  if (existingStudent) {
    return res.status(400).json({
      status: 400,
      message: "Student with the same email or phone number already exists.",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({
      status: 404,
      message: "Student not found",
    });
  }

  const gradeRecord = await Grade.findOne({ gradeName: grade });
  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  let startYear;
  if (currentMonth >= 9) {
    startYear = currentYear;
  } else {
    startYear = currentYear - 1;
  }

  const academicYearRecord = await AcademicYear.findOne({ startYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const updateData = {
    fullName,
    dateOfBirth,
    gender,
    address,
    phone: phoneNumber,
    email: emailAddress,
    gradeId: gradeRecord._id,
    academicYear_id: academicYearRecord._id,
  };

  // Only update classId if the grade or academic year changed
  if (
    student.gradeId.toString() !== gradeRecord._id.toString() ||
    student.academicYear_id.toString() !== academicYearRecord._id.toString()
  ) {
    updateData.classId = null; // Reset class assignment if grade/year changed
  }

  if (password) {
    updateData.password = await hashPassword(password);
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  res.status(200).json({
    status: 200,
    message: "Student updated successfully",
    updatedStudent,
  });
});

const deleteStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Student ID",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({
      status: 404,
      message: "Student not found",
    });
  }

  try {
    // Only decrement class count if student was assigned to a class
    if (student.classId) {
      await Class.findByIdAndUpdate(student.classId, {
        $inc: { student_count: -1 },
      });
    }

    await Student.findByIdAndDelete(id);
    await Attendance.deleteMany({ student_id: id });

    res.status(200).json({
      status: 200,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

const getStudent = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }

    const student = await getStudentById(id);

    res.status(200).json({
      status: 200,
      message: "Student retrieved successfully",
      student,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllStudents = expressAsyncHandler(async (req, res) => {
  try {
    const students = await Student.find()
      .populate("gradeId", "gradeName")
      .populate("classId", "className")
      .populate("academicYear_id", "startYear");

    res.status(200).json({
      status: 200,
      message: "Students retrieved successfully",
      students,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});
const createMultipleStudents = expressAsyncHandler(async (req, res) => {
  const { students } = req.body;

  // Validate that students array exists and is not empty
  if (!students || !Array.isArray(students) || students.length === 0) {
    return res.status(400).json({
      status: 400,
      message:
        "Students array is required and must contain at least one student",
    });
  }

  // Validate maximum number of students (to prevent overload)
  if (students.length > 100) {
    return res.status(400).json({
      status: 400,
      message: "Maximum 100 students can be created at once",
    });
  }

  const results = {
    successful: [],
    failed: [],
    duplicates: [],
    totalProcessed: students.length,
  };

  try {
    // Get current academic year
    const currentYear = moment().year();
    const currentMonth = moment().month() + 1;
    let startYear = currentMonth >= 9 ? currentYear : currentYear - 1;

    const academicYearRecord = await AcademicYear.findOne({ startYear });
    if (!academicYearRecord) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found",
      });
    }

    // Pre-validate all students and collect email/phone numbers
    const emailsAndPhones = [];
    const validStudents = [];

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      // Validate each student
      const { error } = studentValidationSchema.validate(student);
      if (error) {
        results.failed.push({
          index: i + 1,
          student: student,
          error: error.details[0].message,
        });
        continue;
      }

      // Check for duplicates within the batch
      const emailExists = emailsAndPhones.find(
        (ep) => ep.email === student.emailAddress
      );
      const phoneExists = emailsAndPhones.find(
        (ep) => ep.phone === student.phoneNumber
      );

      if (emailExists || phoneExists) {
        results.duplicates.push({
          index: i + 1,
          student: student,
          error: "Duplicate email or phone within the batch",
        });
        continue;
      }

      emailsAndPhones.push({
        email: student.emailAddress,
        phone: student.phoneNumber,
        index: i,
      });

      validStudents.push({ ...student, originalIndex: i });
    }

    // Check for existing students in database
    const existingStudents = await Student.find({
      $or: emailsAndPhones.map((ep) => ({
        $or: [{ email: ep.email }, { phone: ep.phone }],
      })),
    });

    // Remove students that already exist in database
    const finalValidStudents = validStudents.filter((student) => {
      const exists = existingStudents.find(
        (existing) =>
          existing.email === student.emailAddress ||
          existing.phone === student.phoneNumber
      );

      if (exists) {
        results.duplicates.push({
          index: student.originalIndex + 1,
          student: student,
          error: "Student with same email or phone already exists in database",
        });
        return false;
      }
      return true;
    });

    // Process valid students
    for (const studentData of finalValidStudents) {
      try {
        const {
          fullName,
          emailAddress,
          phoneNumber,
          password,
          dateOfBirth,
          gender,
          grade,
          address,
        } = studentData;

        // Find grade record
        const gradeRecord = await Grade.findOne({ gradeName: grade });
        if (!gradeRecord) {
          results.failed.push({
            index: studentData.originalIndex + 1,
            student: studentData,
            error: `Grade "${grade}" not found`,
          });
          continue;
        }

        // Generate academic number
        const academicNumber = await generateAcademicNumber();
        const admissionDate = moment().toDate();

        // Create student
        const newStudent = new Student({
          academic_number: academicNumber,
          fullName,
          dateOfBirth,
          gender,
          address,
          phone: phoneNumber,
          email: emailAddress,
          admission_date: admissionDate,
          password: await hashPassword(password),
          gradeId: gradeRecord._id,
          classId: null,
          academicYear_id: academicYearRecord._id,
        });

        await newStudent.save();

        // Create verification token
        const verificationMessage = await createVerificationToken(
          newStudent._id,
          "Student",
          newStudent.email
        );

        results.successful.push({
          index: studentData.originalIndex + 1,
          student: {
            _id: newStudent._id,
            academic_number: newStudent.academic_number,
            fullName: newStudent.fullName,
            email: newStudent.email,
            grade: grade,
          },
          verificationMessage,
        });
      } catch (error) {
        results.failed.push({
          index: studentData.originalIndex + 1,
          student: studentData,
          error: error.message,
        });
      }
    }

    // Prepare response
    const response = {
      status: 200,
      message: `Bulk student creation completed. ${results.successful.length} successful, ${results.failed.length} failed, ${results.duplicates.length} duplicates`,
      summary: {
        totalProcessed: results.totalProcessed,
        successful: results.successful.length,
        failed: results.failed.length,
        duplicates: results.duplicates.length,
      },
      results: results,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Bulk student creation error:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to create students",
      error: error.message,
    });
  }
});
module.exports = {
  createStudent,
  createMultipleStudents,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
  assignStudentsToClasses,
  getUnassignedStudents,
};
