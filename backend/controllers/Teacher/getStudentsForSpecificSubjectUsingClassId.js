const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Class = require("../../DB/classModel");
const student = require("../../DB/student");
const getStudentsForSpecificSubjectUsingClassId = expressAsyncHandler(
  async (req, res) => {
    const gradeSubjectSemesterId = req.params.gradeSubjectSemesterId;
    if (!validateObjectId(gradeSubjectSemesterId)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid subject ID" });
    }
    const gradeSubjectSemester = await GradeSubjectSemester.findById(
      gradeSubjectSemesterId
    ).populate({ path: "grade_subject_id", populate: { path: "gradeId" } });
    if (!gradeSubjectSemester) {
      return res
        .status(404)
        .json({ status: 404, message: "Grade Subject Semester not found" });
    }

    const classId = req.body.classId;
    if (!validateObjectId(classId)) {
      return res.status(400).json({ status: 400, message: "Invalid class ID" });
    }
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ status: 404, message: "Class not found" });
    }
    const students = await student
      .find({
        gradeId: gradeSubjectSemester.grade_subject_id.gradeId,
        classId,
      })
      .populate({ path: "gradeId" })
      .populate({ path: "classId" });
    res.status(200).json({ status: 200, students });
  }
);

module.exports = getStudentsForSpecificSubjectUsingClassId;
