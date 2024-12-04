const expressAsyncHandler = require("express-async-handler");
const { Teacher, validateTeacher } = require("../../../DB/teacher");
const bcrypt = require("bcrypt");

const TeacherRegister = expressAsyncHandler(async (req, res) => {
  const { error } = validateTeacher(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let teacher = await Teacher.findOne({ email: req.body.email });
  if (teacher)
    return res.status(400).json({ message: "Teacher already registered." });

  teacher = new Teacher({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    SSN: req.body.SSN,
    subject: req.body.subject,
    themePreference: req.body.themePreference,
    notificationsEnabled: req.body.notificationsEnabled,
    department: req.body.department,
    score: req.body.score,
    gender: req.body.gender,
    phone: req.body.phone,
    classes: req.body.classes,
  });

  const salt = await bcrypt.genSalt(10);
  teacher.password = await bcrypt.hash(teacher.password, salt);

  try {
    await teacher.save();
    res
      .status(201)
      .json({ message: "Teacher registered successfully.", teacher });
  } catch (err) {
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
});
module.exports = TeacherRegister;
