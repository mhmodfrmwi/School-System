const studentSchema = new mongoose.Schema({
  academic_number: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  admission_date: { type: Date, required: true },
  password: { type: String, required: true },

  grade_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  academic_year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
