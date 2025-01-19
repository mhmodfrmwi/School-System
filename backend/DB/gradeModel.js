const gradeSchema = new mongoose.Schema({
  grade_name: { type: String, required: true },
});

module.exports = mongoose.model("Grade", gradeSchema);
