const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Teacher = require("../../DB/teacher");
const Class = require("../../DB/classModel");
const ClassTeacher = require("../../DB/classTeacherModel");

const getTeacherClasses = expressAsyncHandler(async (req, res) => {
    const teacherId = req.user.id;

    if (!validateObjectId(teacherId)) {
        return res.status(400).json({ status: 400, message: "Invalid ID" });
    }

    // Find the teacher
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
        return res.status(404).json({
            status: 404,
            message: "Teacher not found",
        });
    }
    const subjectId = teacher.subjectId;
    
    const classTeachers = await ClassTeacher.find({ teacherId })
        .populate("classId")
        .populate("subjectId")
        .populate("semester_id");

    if (classTeachers.length === 0) {
        return res.status(404).json({
            status: 404,
            message: "No classes found for the teacher",
        });
    }

    const classIds = classTeachers.map(ct => ct.classId);

    const classes = await Class.find({ _id: { $in: classIds } }).populate("gradeId");

    if (classes.length === 0) {
        return res.status(404).json({
            status: 404,
            message: "No classes found for the teacher",
        });
    }

    const classesWithDetails = classes.map(cls => {
        
    const classTeacherEntry = classTeachers.find(ct => ct.classId._id.toString() === cls._id.toString());

        return {
            ...cls.toObject(),
            subject: classTeacherEntry.subjectId,
            semester: classTeacherEntry.semester_id,
        };
    });

    return res.status(200).json({
        status: 200,
        message: "Classes retrieved successfully",
        data: classesWithDetails,
    });
});

module.exports = {
    getTeacherClasses,
};
