const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { Student, validateStudent } = require("../../../DB/student");
const StudentRegister = expressAsyncHandler(async (req, res) => {
  console.log(req.body);

  const { error } = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let student = await Student.findOne({ email: req.body.email });
  if (student)
    return res.status(400).json({ message: "Student already registered." });
  student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    SSN: req.body.SSN,
    themePreference: req.body.themePreference,
    notificationsEnabled: req.body.notificationsEnabled,
    academicYear: req.body.academicYear,
    class: req.body.class,
    score: req.body.score,
    order: req.body.order,
    gender: req.body.gender,
  });

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);

  try {
    await student.save();
    res.status(201).json({ message: "Student registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
});
module.exports = StudentRegister;
