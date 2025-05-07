const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const managerValidationSchema = require("../../validations/managerValidation");
const Manager = require("../../DB/managerModel");
const hashPassword = require("../../utils/hashPassword");
const { createVerificationToken } = require("../../utils/verificationToken");

const createManager = expressAsyncHandler(async (req, res) => {
  const { error } = managerValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingManager = await Manager.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingManager) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const manager = new Manager({
    fullName: req.body.fullName,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    phone: req.body.phone,
    gender: req.body.gender,
  });

  await manager.save();
  const message = await createVerificationToken(
    manager._id,
    "Manager",
    manager.email
  );
  res.status(201).json({
    status: 201,
    message,
    manager,
  });
});

const updateManager = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Manager ID",
    });
  }

  const { error } = managerValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingManager = await Manager.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    ],
  });
  if (existingManager) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const manager = await Manager.findByIdAndUpdate(
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

  if (!manager) {
    return res.status(404).json({
      status: 404,
      message: "Manager not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Manager updated successfully",
    manager,
  });
});

const deleteManager = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Manager ID",
    });
  }

  const manager = await Manager.findByIdAndDelete(id);

  if (!manager) {
    return res.status(404).json({
      status: 404,
      message: "Manager not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Manager deleted successfully",
  });
});

const getManager = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Manager ID",
      });
    }

    const manager = await Manager.findById(id);

    if (!manager) {
      return res.status(404).json({
        status: 404,
        message: "Manager not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Manager retrieved successfully",
      manager,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllManager = expressAsyncHandler(async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json({
      status: 200,
      message: "Managers retrieved successfully",
      managers,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createManager,
  updateManager,
  deleteManager,
  getManager,
  getAllManager,
};
