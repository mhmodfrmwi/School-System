const expressAsyncHandler = require("express-async-handler");
const { Parent, validateParent } = require("../../../DB/Parent");
const bcrypt = require("bcrypt");

const ParentRegister = expressAsyncHandler(async (req, res) => {
  const { error } = validateParent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let parent = await Parent.findOne({ email: req.body.email });
  if (parent)
    return res.status(400).json({ message: "Parent already registered." });

  parent = new Parent({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    SSN: req.body.SSN,
    themePreference: req.body.themePreference,
    notificationsEnabled: req.body.notificationsEnabled,
    order: req.body.order,
    gender:req.body.gender,
    phone:req.body.phone
  });

  const salt = await bcrypt.genSalt(10);
  parent.password = await bcrypt.hash(parent.password, salt);

  try {
    await parent.save();
    res
      .status(201)
      .json({ message: "Parent registered successfully.", parent });
  } catch (err) {
    res.status(500).josn({ messge: "Internal server error: " + err.message });
  }
});
module.exports = ParentRegister;
