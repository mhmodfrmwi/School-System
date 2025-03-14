const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const examRoutes = require("./routes/examRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const examScheduleRoutes = require("./routes/examScheduleRoutes");
const errorHandler = require("./middleware/errorHandler");
const fetchAndRegisterModel = require("./utils/fetchAndRegisterModel");

connectDB();

let Subject, Grade, Class, AcademicYear, Semester, Teacher, Student, Question;
(async () => {
  try {
    Class = await fetchAndRegisterModel("Class");
    Teacher = await fetchAndRegisterModel("Teacher");
    Question = await fetchAndRegisterModel("Question");
    console.log("All models registered successfully");
  } catch (err) {
    console.error("Failed to register models:", err);
    process.exit(1);
  }
})();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/exams", examRoutes);
app.use("/sessions", sessionRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/exam-schedule", examScheduleRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Exams microservice running on port ${PORT}`);
});

/*
  [x] get students' grades after they finish.
  [x] teacher get, update , delete  
*/
