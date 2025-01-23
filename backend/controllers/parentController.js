const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const parentValidationSchema = require("../validations/parentValidation");
const Parent = require("../DB/Parent");
const hashPassword = require("../utils/hashPassword");

const createParent = expressAsyncHandler(async (req, res) => {
  const { error } = parentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingParent = await Parent.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingParent) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const parent = new Parent({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    gender: req.body.gender,
  });

  await parent.save();

  res.status(201).json({
    status: 201,
    message: "Parent created successfully",
    parent,
  });
});

const updateParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent ID",
    });
  }

  const { error } = parentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingParent = await Parent.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    ],
  });
  if (existingParent) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const parent = await Parent.findByIdAndUpdate(
    id,
    {
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      gender: req.body.gender,
    },
    { new: true }
  );

  if (!parent) {
    return res.status(404).json({
      status: 404,
      message: "Parent not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Parent updated successfully",
    parent,
  });
});

const deleteParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent ID",
    });
  }

  const parent = await Parent.findByIdAndDelete(id);

  if (!parent) {
    return res.status(404).json({
      status: 404,
      message: "Parent not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Parent deleted successfully",
  });
});

const getParent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent ID",
    });
  }

  const parent = await Parent.findById(id);

  if (!parent) {
    return res.status(404).json({
      status: 404,
      message: "Parent not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Parent retrieved successfully",
    parent,
  });
});

const getAllParent = expressAsyncHandler(async (req, res) => {
  const parents = await Parent.find();
  res.status(200).json({
    status: 200,
    message: "Parents retrieved successfully",
    parents,
  });
});

module.exports = {
  createParent,
  updateParent,
  deleteParent,
  getParent,
  getAllParent,
};
