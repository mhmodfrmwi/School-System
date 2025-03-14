const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const adminValidationSchema = require("../../validations/adminValidation");
const Admin = require("../../DB/Admin");
const hashPassword = require("../../utils/hashPassword");

const sanitizeAdmin = (admin) => {
  const obj = admin.toObject();
  delete obj.password;
  return obj;
};

const createAdmin = expressAsyncHandler(async (req, res) => {
  const { error } = adminValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const existingAdmin = await Admin.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingAdmin)
    return res.status(409).json({ message: "Admin already exists" });

  const admin = await Admin.create({
    ...req.body,
    password: await hashPassword(req.body.password),
  });

  res.status(201).json(sanitizeAdmin(admin));
});

const updateAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id))
    return res.status(400).json({ message: "Invalid ID" });

  const { error } = adminValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const conflict = await Admin.findOne({
    _id: { $ne: id },
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (conflict) return res.status(409).json({ message: "Credentials in use" });

  const updateData = { ...req.body };
  if (req.body.password) {
    updateData.password = await hashPassword(req.body.password);
  }

  const admin = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  res.json(sanitizeAdmin(admin));
});

const deleteAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id))
    return res.status(400).json({ message: "Invalid ID" });

  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  res.sendStatus(204);
});

const getAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateObjectId(id))
      return res.status(400).json({ message: "Invalid ID" });

    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(sanitizeAdmin(admin));
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const [admins] = await Promise.all([
      Admin.find().select("-password"),
      Admin.countDocuments(),
    ]);

    res.json({
      admins,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
};
