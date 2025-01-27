const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  registrationStart: {
    type: Date,
    required: true
  },
  registrationEnd: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  prizes: {
    type: [String],
    required: true
  },
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;
