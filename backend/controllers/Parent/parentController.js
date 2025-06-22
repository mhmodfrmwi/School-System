const ParentStudent = require("../../DB/ParentStudentModel");
const signToken = require("../../utils/signToken");

const showKids = async (req, res) => {
  try {
    const students = await ParentStudent.find({
      parent_id: req.user.id,
    }).populate({
        path: "student_id",
        populate: [
          { path: "gradeId", select: "gradeName" },
          { path: "classId", select: "className" },
          { path: "academicYear_id", select: "startYear endYear" },
        ],
        select: "-password -__v -createdAt -updatedAt", // hide sensitive info
      })
      .select("-__v -createdAt -updatedAt");

    if (!students || students.length === 0) {
      return res
        .status(200)
        .json({ message: "No students found for this parent" });
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const chooseKid = async (req, res) => {
  try {
    const { id, email, role, classId } = req.body;

    const relationship = await ParentStudent.findOne({
      parent_id: req.user.id,
      student_id: id,
    }).populate("student_id", "fullName");
    console.log(relationship);
    const fullName = relationship.student_id.fullName;
    if (!relationship) {
      throw new Error("Not authorized to access this student");
    }

    const token = signToken(id, email, role, classId);
    res.status(200).json({ student_token: token, email, role, fullName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  showKids,
  chooseKid,
};
