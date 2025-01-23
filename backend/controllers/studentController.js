const expressAsyncHandler = require("express-async-handler");
const moment = require("moment"); // For handling date formatting
const validateObjectId = require("../utils/validateObjectId");
const studentValidationSchema = require("../validations/studentValidation");
const bcrypt = require("bcryptjs");
const Student = require("../DB/student");
const Grade = require("../DB/gradeModel");
const Class = require("../DB/classModel");
const AcademicYear = require("../DB/academicYearModel");


// Function to create academic number
const generateAcademicNumber = async () => {
  const currentYear = moment().year().toString().slice(-2);
  const totalStudents = await Student.countDocuments();
  const studentCount = totalStudents + 1;
  const academicNumber = `${currentYear}${String(studentCount).padStart(4, '0')}`;
  return academicNumber;
};

// find class
async function findClass(gradeId, academicYearId) {
    // Step 1: Fetch all classes in the grade and academic year, sorted by class names
    const allClasses = await Class.find({ grade_id: gradeId, academic_year_id: academicYearId })
      .sort({ class_name: 1 }); // Sorting by class_name in ascending order
  
    // Step 2: Check if there are available classes
    if (allClasses.length === 0) {
      return "No available classes for the given grade and academic year.";
    }
  
    // Step 3: Calculate the total number of students in the given grade and academic year
    const totalStudentsInGradeAndYear = await Student.countDocuments({
      grade_id: gradeId,
      academic_year_id: academicYearId,
    });
  
    // Step 4: Calculate the student's position (index of class they should be in)
    const studentPosition = totalStudentsInGradeAndYear + 1;
  
    // Step 5: Calculate the class index based on the student position (studentPosition / 30 will give the index)
    let classIndex;
    if (studentPosition % 30 === 0) {
      classIndex = Math.floor(studentPosition / 30) - 1;
    } else {
      classIndex = Math.floor(studentPosition / 30);
    }
  
    // Step 6: Check if the class at this index exists in allClasses
    if (!allClasses[classIndex]) {
      return "No available classes to assign the student.";
    }
  
    // Step 7: Assign the student to the class at the calculated index
    const selectedClass = allClasses[classIndex];
  
    // Check if the class has space for the student (less than 30 students)
    if (selectedClass.student_count >= 30) {
      return "The class is full. Unable to assign the student.";
    }
  
    // Assign the student to the class
    const classId = selectedClass._id;
  
    // Step 8: Return the class ID
    return classId ; // Return the class ID
  }
  
  

// Create student function with these enhancements
const createStudent = expressAsyncHandler(async (req, res) => {
  const { error } = studentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { fullName, emailAddress, phoneNumber, password, dateOfBirth, gender, grade ,address } = req.body;

  // Get current year for academic year id
  const startYear = moment().year();
  const academicYearRecord = await AcademicYear.findOne({ startYear });

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  // Generate academic number
  const academicNumber = await generateAcademicNumber();

  //grade id
  const gradeRecord = await Grade.findOne({gradeName:grade})

  // Get current class for student based on grade and academic year
  const classId = await findClass(gradeRecord._id, academicYearRecord._id);
  if(!validateObjectId(classId)){
    return res.status(400).json({
        status: 400,
        message: classId,
      });
  }

  // Set admission date to current date
  const admissionDate = moment().toDate();

  const newStudent = new Student({
    academic_number: academicNumber,
    first_name: fullName.split(" ")[0], // Assuming fullName is "First Last"
    last_name: fullName.split(" ").slice(1).join(" "),
    date_of_birth: dateOfBirth,
    gender,
    address, 
    phone: phoneNumber,
    email: emailAddress,
    admission_date: admissionDate,
    password: await hashPassword(req.body.password),
    grade_id:gradeRecord._id,
    class_id: classId,
    academic_year_id: academicYearRecord._id,
  });

  await newStudent.save();

  res.status(201).json({
    status: 201,
    message: "Student created successfully",
    newStudent,
  });
});

// Update a Student
const updateStudent = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Validate Object ID
    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }
  
    // Validate request body
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
  
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }
  
    // Fetch Grade and Academic Year based on provided grade
    const gradeRecord = await Grade.findOne({ gradeName: grade });
    if (!gradeRecord) {
      return res.status(404).json({
        status: 404,
        message: "Grade not found",
      });
    }
  
    const startYear = new Date().getFullYear();
    const academicYearRecord = await AcademicYear.findOne({ startYear });
    if (!academicYearRecord) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found",
      });
    }
  
    // Assign class to student based on grade and academic year
    const assignedClass = await findClass(gradeRecord._id, academicYearRecord._id);
  
    // Update student fields
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        first_name: fullName.split(" ")[0], // First part of the name
        last_name: fullName.split(" ").slice(1).join(" "), // Remaining part of the name
        email: emailAddress,
        phone: phoneNumber,
        password:await hashPassword(req.body.password), // Ensure password is hashed before saving if required
        date_of_birth: dateOfBirth,
        gender,
        address,
        grade_id: gradeRecord._id,
        class_id: assignedClass.class_id,
        academic_year_id: academicYearRecord._id,
      },
      { new: true }
    );
  
    res.status(200).json({
      status: 200,
      message: "Student updated successfully",
      updatedStudent,
    });
  });

  // Delete a Student
const deleteStudent = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Validate Object ID
    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }
  
    // Find the student by ID
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }
  
    // Delete the student
    await Student.findByIdAndDelete(id);
  
    res.status(200).json({
      status: 200,
      message: "Student deleted successfully",
    });
  });

  // Get a Single Class
const getStudent = expressAsyncHandler(async (req, res) => {
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
  
    res.status(200).json({
      status: 200,
      message: "Stundent retrieved successfully",
      student,
    });
  });
  
  // Get All Students
  const getAllStudents= expressAsyncHandler(async (req, res) => {
    const students = await Student.find();
  
    res.status(200).json({
      status: 200,
      message: "Students retrieved successfully",
      students,
    });
  });
module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent,
    getAllStudents
};

