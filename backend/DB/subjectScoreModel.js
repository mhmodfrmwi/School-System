const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectScoreSchema = new Schema({
  subjectId: { 
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  semesterId: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  gradeId:{
    type: Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  type: {
    type: String,
    enum: ['midterm', 'final'],
    required: true
  },
  /*
  gradeSubjectSemesterId: { 
    type: Schema.Types.ObjectId,
    ref: 'GradeSubjectSemester',
    required: true,
    unique: true
  },*/
  finalDegree: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('SubjectScore', subjectScoreSchema);