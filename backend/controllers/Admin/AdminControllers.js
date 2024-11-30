const asyncHandler = require("express-async-handler");
const { Student } = require("../../DB/student");
const { Teacher } = require("../../DB/teacher");
const { Admin } = require("../../DB/Admin");
const { Parent } = require("../../DB/Parent");
const { Boss } = require("../../DB/Boss");
const { default: mongoose } = require("mongoose");
const GetStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json({
    status: 200,
    students,
  });
});
const GetTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.json({
    status: 200,
    teachers,
  });
});
const GetaAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.json({
    status: 200,
    admins,
  });
});
const GetParents = asyncHandler(async (req, res) => {
  const parents = await Parent.find();
  res.json({
    status: 200,
    parents,
  });
});
const GetBosses = asyncHandler(async (req, res) => {
  const bosses = await Boss.find();
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

  const student = await Student.findById(id);
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

  const teacher = await Teacher.findById(id);
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

  const admin = await Admin.findById(id);
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

  const parent = await Parent.findById(id);
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

  const boss = await Boss.findById(id);
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
};
