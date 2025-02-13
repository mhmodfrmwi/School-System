const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const schoolHubValidationSchema = require("../../validations/schoolHubValidation");
const SchoolHub = require("../../DB/schoolHubModel");

const createSchoolHub = expressAsyncHandler(async (req, res) => {
    const managerId = req.user.id;
    console.log(req);
    if (!validateObjectId(managerId)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid manager ID.",
        });
      }
    const { error } = schoolHubValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const { title, registrationStart, registrationEnd, details, prizes } = req.body;

    const existingSchoolHub = await SchoolHub.findOne({ title, registrationStart, registrationEnd });
    if (existingSchoolHub) {
        return res.status(400).json({
            status: 400,
            message: "A SchoolHub event with the same title and registration dates already exists.",
        });
    }

    const newSchoolHub = new SchoolHub({
        title,
        registrationStart,
        registrationEnd,
        details,
        prizes,
    });

    await newSchoolHub.save();

    res.status(201).json({
        status: 201,
        message: "SchoolHub created successfully",
        newSchoolHub,
    });
});
const getAllSchoolHubs2 = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        status: 200,
        message: "SchoolHubs retrieved successfully",
    });
});

const getAllSchoolHubs = expressAsyncHandler(async (req, res) => {
    const schoolHubs = await SchoolHub.find();

    res.status(200).json({
        status: 200,
        message: "SchoolHubs retrieved successfully",
        schoolHubs,
    });
});


const getSchoolHub = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid SchoolHub ID",
        });
    }

    const schoolHub = await SchoolHub.findById(id);
    if (!schoolHub) {
        return res.status(404).json({
            status: 404,
            message: "SchoolHub not found",
        });
    }

    res.status(200).json({
        status: 200,
        message: "SchoolHub retrieved successfully",
        schoolHub,
    });
});

const updateSchoolHub = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid SchoolHub ID",
        });
    }

    const { error } = schoolHubValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }

    const schoolHub = await SchoolHub.findById(id);
    if (!schoolHub) {
        return res.status(404).json({
            status: 404,
            message: "SchoolHub not found",
        });
    }

    Object.assign(schoolHub, req.body);
    await schoolHub.save();

    res.status(200).json({
        status: 200,
        message: "SchoolHub updated successfully",
        schoolHub,
    });
});

const deleteSchoolHub = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid SchoolHub ID",
        });
    }

    const schoolHub = await SchoolHub.findById(id);
    if (!schoolHub) {
        return res.status(404).json({
            status: 404,
            message: "SchoolHub not found",
        });
    }

    await schoolHub.deleteOne();

    res.status(200).json({
        status: 200,
        message: "SchoolHub deleted successfully",
    });
});

module.exports = {
    createSchoolHub,
    getAllSchoolHubs,
    getSchoolHub,
    updateSchoolHub,
    deleteSchoolHub,
    getAllSchoolHubs2
};
