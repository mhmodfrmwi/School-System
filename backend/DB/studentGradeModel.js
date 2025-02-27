const studentGradeSchema = new mongoose.Schema(
  {
    student_id: {
      type: "ObjectId",
      ref: "Student",
      required: true,
    },
    academic_number: { type: "String", required: true },
    class_id: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
    subject_id: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    grade: { type: "String", required: true },
    exam_date: { type: "Date", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentGrade", studentGradeSchema);
