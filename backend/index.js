const express = require("express");
const cors = require("cors"); // Import cors package
// const connectToDB = require("./DB/connnectToDB");
require("dotenv").config();
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { connectToDB } = require("./DB/connectToDB");
connectToDB();
const app = express(xss());
app.use(helmet());
app.use(hpp());
app.get("/test", (req, res) => {
  res.json({
    message: "hello",
  });
});
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     standardHeaders: "draft-7",
//     legacyHeaders: false,
//   })
// );

app.use(
  cors({
    origin: process.env.DOMAIN_LINK,
  })
);

app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
