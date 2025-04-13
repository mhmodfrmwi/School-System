const ParentStudent = require("../../DB/parentStudent");
const signToken = require("../../utils/signToken");

const showKids = async (req, res) => {
  try {
    const students = await ParentStudent.find({
      parent_id: req.user.id,
    }).populate("student_id");

    if (!students || students.length === 0) {
      throw new Error("No students found for this parent");
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
    });

    if (!relationship) {
      throw new Error("Not authorized to access this student");
    }

    const token = signToken(id, email, role, classId);
    res.status(200).json({ student_token: token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  showKids,
  chooseKid,
};
