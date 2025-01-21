const parentStudentSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  academic_number: { type: String, required: true },
});

module.exports = mongoose.model("ParentStudent", parentStudentSchema);
