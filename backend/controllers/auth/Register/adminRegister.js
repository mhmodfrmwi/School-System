const asyncHandler = require("express-async-handler");
const { Admin, validateAdmin } = require("../../../DB/Admin");
const bcrypt = require("bcrypt");
const AdminRegister = asyncHandler(async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let admin = await Admin.findOne({ email: req.body.email });
  if (admin)
    return res.status(400).json({ message: "Admin already registered." });
  admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    SSN: req.body.SSN,
    themePreference: req.body.themePreference,
    notificationsEnabled: req.body.notificationsEnabled,
  });

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  try {
    await admin.save();
    return res
      .status(201)
      .json({ message: "Admin registered successfully.", admin });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + err.message });
  }
});
module.exports = AdminRegister;
