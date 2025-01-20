const express = require("express");
const cors = require("cors");
require("dotenv").config();
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { connectToDB } = require("./DB/connectToDB");
connectToDB();

const app = express(xss());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "hello" });
});
app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
