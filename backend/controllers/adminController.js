const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const adminValidationSchema = require("../validations/adminValidation");
const Admin = require("../DB/Admin");
const hashPassword = require("../utils/hashPassword");

const createAdmin = expressAsyncHandler(async (req, res) => {
  const { error } = adminValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingAdmin = await Admin.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingAdmin) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const admin = new Admin({
    fullName: req.body.fullName,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    phone: req.body.phone,
    gender: req.body.gender,
  });

  await admin.save();

  res.status(201).json({
    status: 201,
    message: "Admin created successfully",
    admin,
  });
});

const updateAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Admin ID",
    });
  }

  const { error } = adminValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingAdmin = await Admin.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    ],
  });
  if (existingAdmin) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const admin = await Admin.findByIdAndUpdate(
    id,
    {
      fullName: req.body.fullName,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      phone: req.body.phone,
      gender: req.body.gender,
    },
    { new: true }
  );

  if (!admin) {
    return res.status(404).json({
      status: 404,
      message: "Admin not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Admin updated successfully",
    admin,
  });
});

const deleteAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Admin ID",
    });
  }

  const admin = await Admin.findByIdAndDelete(id);

  if (!admin) {
    return res.status(404).json({
      status: 404,
      message: "Admin not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Admin deleted successfully",
  });
});

const getAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Admin ID",
    });
  }

  const admin = await Admin.findById(id);

  if (!admin) {
    return res.status(404).json({
      status: 404,
      message: "Admin not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Admin retrieved successfully",
    admin,
  });
});

const getAllAdmin = expressAsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: 200,
    message: "Admins retrieved successfully",
    admins,
  });
});

module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
};
