const asyncHandler = require("express-async-handler");
const { Student } = require("../../DB/student");
const { Teacher } = require("../../DB/teacher");
const { Admin, validateAdmin } = require("../../DB/Admin");
const { Parent } = require("../../DB/Parent");
const { Boss } = require("../../DB/Boss");
const { default: mongoose } = require("mongoose");
const { validateSchedualForm, Schedual } = require("../../DB/scheduale");
const { validateTermForm, Term } = require("../../DB/term");
const { Course, validateCourse } = require("../../DB/courseModel");
const GetStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  res.json({
    status: 200,
    students,
  });
});
const GetTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({}, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  res.json({
    status: 200,
    teachers,
  });
});
const GetaAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  res.json({
    status: 200,
    admins,
  });
});
const GetParents = asyncHandler(async (req, res) => {
  const parents = await Parent.find({}, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  res.json({
    status: 200,
    parents,
  });
});
const GetBosses = asyncHandler(async (req, res) => {
  const bosses = await Boss.find({}, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  res.json({
    status: 200,
    bosses,
  });
});
const GetOneStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const student = await Student.findById({ _id: id }, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  if (!student) {
    return res.json({
      status: 404,
      message: "Student not found",
    });
  }
  res.json({
    status: 200,
    student,
  });
});
const GetOneTeacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const teacher = await Teacher.findById({ _id: id }, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  if (!teacher) {
    return res.json({
      status: 404,
      message: "Teacher not found",
    });
  }
  res.json({
    status: 200,
    teacher,
  });
});
const GetOneAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const admin = await Admin.findById({ _id: id }, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  if (!admin) {
    return res.json({
      status: 404,
      message: "Admin not found",
    });
  }
  res.json({
    status: 200,
    admin,
  });
});
const GetOneParent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const parent = await Parent.findById({ _id: id }, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  if (!parent) {
    return res.json({
      status: 404,
      message: "Parent not found",
    });
  }
  res.json({
    status: 200,
    parent,
  });
});
const GetOneBoss = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const boss = await Boss.findById({ _id: id }, [
    "-password",
    "-__v",
    "-notificationsEnabled",
  ]);
  if (!boss) {
    return res.json({
      status: 404,
      message: "Boss not found",
    });
  }
  res.json({
    status: 200,
    boss,
  });
});
const UpdateStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.json({
      status: 404,
      message: "Student not found",
    });
  }

  const newStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    status: 200,
    newStudent,
  });
});
const UpdateTeacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return res.json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const newTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    status: 200,
    newTeacher,
  });
});
const UpdateAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    return res.json({
      status: 404,
      message: "Admin not found",
    });
  }

  const newAdmin = await Admin.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    status: 200,
    newAdmin,
  });
});
const UpdateBoss = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const boss = await Boss.findById(id);
  if (!boss) {
    return res.json({
      status: 404,
      message: "Boss not found",
    });
  }

  const newBoss = await Boss.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    status: 200,
    newBoss,
  });
});
const UpdateParent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const parent = await Parent.findById(id);
  if (!parent) {
    return res.json({
      status: 404,
      message: "Parent not found",
    });
  }

  const newParent = await Parent.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    status: 200,
    newParent,
  });
});
const DeleteStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.json({
      status: 404,
      message: "Student not found",
    });
  }

  await Student.findByIdAndDelete(id);
  res.json({
    status: 200,
    student,
  });
});
const DeleteTeacher = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return res.json({
      status: 404,
      message: "Teacher not found",
    });
  }
  await Teacher.findByIdAndDelete(id);
  res.json({
    status: 200,
    teacher,
  });
});
const DeleteAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const admin = await Admin.findById(id);
  if (!admin) {
    return res.json({
      status: 404,
      message: "Admin not found",
    });
  }

  await Admin.findByIdAndDelete(id);
  res.json({
    status: 200,
    admin,
  });
});
const DeleteBoss = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const boss = await Boss.findById(id);
  if (!boss) {
    return res.json({
      status: 404,
      message: "Boss not found",
    });
  }

  await Boss.findByIdAndDelete(id);
  res.json({
    status: 200,
    boss,
  });
});
const DeleteParent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }

  const parent = await Parent.findById(id);
  if (!parent) {
    return res.json({
      status: 404,
      message: "Parent not found",
    });
  }

  await Parent.findByIdAndDelete(id);
  res.json({
    status: 200,
    parent,
  });
});
const CreateSchedual = asyncHandler(async (req, res) => {
  const { error } = validateSchedualForm(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const Teach = await Teacher.findOne({ SSN: req.body.SSN });
  if (!Teach) {
    return res.json({
      status: 404,
      message: "Teacher not found",
    });
  }
  const schedual = new Schedual({
    subjectName: req.body.subjectName,
    teacher: Teach._id,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    class: req.body.class,
    grade: req.body.grade,
  });
  await schedual.save();
  res.json({
    status: 200,
    message: "Schedual has been added successfully",
    schedual,
  });
});
const GetAllSchedual = asyncHandler(async (req, res) => {
  const scheduals = await Schedual.find();
  res.status(200).json({
    status: 200,
    scheduals,
  });
});
const GetOneSchedual = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  const schedual = await Schedual.findById({ _id: id });
  if (!schedual) {
    return res.status(404).json({
      status: 404,
      message: "Schedual not found",
    });
  }

  res.status(200).json({
    status: 200,
    schedual,
  });
});
const UpdateSchedual = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let schedual = await Schedual.findById({ _id: id });
  if (!schedual) {
    return res.status(404).json({
      status: 404,
      message: "Schedual not found",
    });
  }
  if (req.body.teacher) {
    const Teach = await Teacher.findOne({ SSN: req.body.SSN });
    if (!Teach) {
      return res.json({
        status: 404,
        message: "Teacher not found",
      });
    }
    req.body.teacher = Teach._id;
  }

  schedual = await Schedual.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(200).json({
    status: 200,
    schedual,
  });
});
const DeleteSchedual = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let schedual = await Schedual.findById({ _id: id });
  if (!schedual) {
    return res.status(404).json({
      status: 404,
      message: "Schedual not found",
    });
  }
  if (req.body.teacher) {
    const Teach = await Teacher.findOne({ SSN: req.body.SSN });
    if (!Teach) {
      return res.json({
        status: 404,
        message: "Teacher not found",
      });
    }
    req.body.teacher = Teach._id;
  }

  await schedual.deleteOne({ _id: id });
  res.status(200).json({
    status: 200,
    message: "Schedual has been deleted successfully",
  });
});
const CreateTerm = asyncHandler(async (req, res) => {
  const { error } = validateTermForm(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const term = new Term({
    startYear: req.body.startYear,
    endYear: req.body.endYear,
    term: req.body.term,
  });
  await term.save();
  res.status(200).json({
    status: 200,
    message: "Term has been created successfully",
    term,
  });
});
const GetAllTerms = asyncHandler(async (req, res) => {
  const terms = await Term.find();
  res.status(200).json({
    status: 200,
    terms,
  });
});

const GetOneTerm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  const term = await Term.findById({ _id: id });
  if (!term) {
    return res.status(404).json({
      status: 404,
      message: "Term not found",
    });
  }

  res.status(200).json({
    status: 200,
    term,
  });
});

const UpdateTerm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let term = await Term.findById({ _id: id });
  if (!term) {
    return res.status(404).json({
      status: 404,
      message: "Term not found",
    });
  }

  term = await Term.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(200).json({
    status: 200,
    term,
  });
});

const DeleteTerm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let term = await Term.findById({ _id: id });
  if (!term) {
    return res.status(404).json({
      status: 404,
      message: "Term not found",
    });
  }

  await term.deleteOne({ _id: id });
  res.status(200).json({
    status: 200,
    message: "Term has been deleted successfully",
  });
});
const CreateCourse = asyncHandler(async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const course = new Course({
    name: req.body.name,
    term: req.body.term,
    grade: req.body.grade,
  });

  await course.save();
  res.status(200).json({
    status: 200,
    message: "Course has been created successfully",
    course,
  });
});

const GetAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    status: 200,
    courses,
  });
});
const GetOneCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  const course = await Course.findById({ _id: id });
  if (!course) {
    return res.status(404).json({
      status: 404,
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: 200,
    course,
  });
});
const UpdateCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let course = await Course.findById({ _id: id });
  if (!course) {
    return res.status(404).json({
      status: 404,
      message: "Course not found",
    });
  }

  course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(200).json({
    status: 200,
    course,
  });
});
const DeleteCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      status: 400,
      message: "Invalid id format",
    });
  }
  let course = await Course.findById({ _id: id });
  if (!course) {
    return res.status(404).json({
      status: 404,
      message: "Course not found",
    });
  }

  await course.deleteOne({ _id: id });
  res.status(200).json({
    status: 200,
    message: "Course has been deleted successfully",
  });
});
module.exports = {
  GetBosses,
  GetOneAdmin,
  GetStudents,
  GetTeachers,
  GetaAdmins,
  GetParents,
  GetOneStudent,
  GetOneTeacher,
  GetOneParent,
  GetOneBoss,
  UpdateStudent,
  UpdateTeacher,
  UpdateBoss,
  UpdateParent,
  UpdateAdmin,
  DeleteAdmin,
  DeleteBoss,
  DeleteParent,
  DeleteTeacher,
  DeleteStudent,
  CreateSchedual,
  CreateTerm,
  CreateCourse,
  GetAllCourses,
  GetAllSchedual,
  GetAllTerms,
  GetOneSchedual,
  GetOneTerm,
  GetOneCourse,
  UpdateSchedual,
  UpdateTerm,
  UpdateCourse,
  DeleteSchedual,
  DeleteTerm,
  DeleteCourse,
};
