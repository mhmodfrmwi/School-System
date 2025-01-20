const teacherSchema = new mongoose.Schema({
  academic_number: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },

  phone: { type: String, required: true },
  email: { type: String, required: true },
  hire_date: { type: Date, required: true },
});

module.exports = mongoose.model("Teacher", teacherSchema);
