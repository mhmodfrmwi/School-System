const Admin = require("../DB/AdminModel");
const Manager = require("../DB/managerModel");
const Parent = require("../DB/ParentModel");
const StudentModel = require("../DB/StudentModel");
const Teacher = require("../DB/TeacherModel");

const verifyAllAccounts = async () => {
  const students = await StudentModel.find({});
  students.map(async (student) => {
    student.isVerified = true;
    await student.save();
  });
  const parents = await Parent.find({});
  parents.map(async (parent) => {
    parent.isVerified = true;
    await parent.save();
  });
  const teachers = await Teacher.find({});
  teachers.map(async (teacher) => {
    teacher.isVerified = true;
    await teacher.save();
  });
  const managers = await Manager.find({});
  managers.map(async (manager) => {
    manager.isVerified = true;
    await manager.save();
  });
  const admins = await Admin.find({});
  admins.map(async (admin) => {
    admin.isVerified = true;
    await admin.save();
  });
  return "All accounts verified successfully";
};
module.exports = verifyAllAccounts;
