const express = require("express");
const cors = require("cors");
require("dotenv").config();
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const csrf = require("csurf");
const hpp = require("hpp");
const { connectToDB } = require("./DB/connectToDB");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const managerRoutes = require("./routes/managerRoutes");
const parentRoutes = require("./routes/parentRoutes");
const generalRoutes = require("./routes/generalRoutes");
const exposeModelsRoutes = require("./routes/exposeModelsRoutes");
const errorHandler = require("./middlewares/errorHandler");
connectToDB();
const app = express(xss());
const routNode = "/api/v1";
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "hello" });
});
// app.use(csrf({ cookie: true }));

// app.use((req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });
app.use(express.json());
app.use(`${routNode}/admin`, adminRoutes);
app.use(`${routNode}/student`, studentRoutes);
app.use(`${routNode}/teacher`, teacherRoutes);
app.use(`${routNode}/manager`, managerRoutes);
app.use(`${routNode}/parent`, parentRoutes);
app.use(`${routNode}/general`, generalRoutes);
app.use(`${routNode}/expose-models`, exposeModelsRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
