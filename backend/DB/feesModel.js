const feeSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  academic_number: { type: String, required: true }, // Add academic number
  fee_type: { type: String, required: true },
  amount: { type: Number, required: true },
  due_date: { type: Date, required: true },
  paid_date: { type: Date },
  status: { type: String, enum: ["Paid", "Unpaid"], required: true },
});

module.exports = mongoose.model("Fee", feeSchema);
