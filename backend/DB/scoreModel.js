const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  /*gradeId: {
    type: Schema.Types.ObjectId,
    ref: 'Grade',
    required: true
  },*/
  academicYearId: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  /*semesterId: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },*/
  /*type: {
    type: String,
    enum: ['midterm', 'final'],
    required: true
  },*/
  examGrade: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  subjectScoreId: {
    type: Schema.Types.ObjectId,
    ref: 'SubjectScore',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Score', scoreSchema);