const mongoose = require("mongoose");
const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
module.exports = validateObjectId;
