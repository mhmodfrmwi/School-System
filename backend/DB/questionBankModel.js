const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionType: { 
        type: String, 
        required: true,
        enum: ['MCQ', 'True/False', 'Short Answer', 'Essay']
    },
    questionText: { 
        type: String, 
        required: true 
    },
    subjectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
    gradeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Grade', 
        required: true 
    },
    semesterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester', 
        required: true 
    },
    teacherId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher', 
        required: true 
    },
    answer: { 
        type: String, 
        required: true 
    },
    choices: {
        type: [String],
        required: function() {
            return this.questionType === 'MCQ';
        },
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;