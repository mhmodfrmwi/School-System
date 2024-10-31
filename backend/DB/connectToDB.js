const mongoose = require("mongoose");

connectToDB()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function connectToDB() {
  await mongoose.connect(process.env.MONGODB_URL);
}
module.exports = {
  connectToDB,
};
