const subjectSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
