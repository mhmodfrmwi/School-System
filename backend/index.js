const express = require("express");
const cors = require("cors");
require("dotenv").config();
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { connectToDB } = require("./DB/connectToDB");
const authRoute = require("./routes/authRoute");

connectToDB();

const app = express(xss());
app.use(cors({ origin: "*" })); // Move CORS here
app.use(helmet());
app.use(hpp());

app.get("/test", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/api/v1/auth", authRoute);

app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
