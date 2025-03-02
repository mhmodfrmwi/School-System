const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const examRoutes = require("./routes/examRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const errorHandler = require("./middleware/errorHandler");
const fetchAndRegisterModel = require("./utils/fetchAndRegisterModel");

connectDB();

let Subject,
  Grade,
  Class,
  AcademicYear,
  Semester,
  Teacher,
  Student,
  GradeSubject,
  Question;
(async () => {
  try {
    Grade = await fetchAndRegisterModel("Grade");
    AcademicYear = await fetchAndRegisterModel("AcademicYear");
    Class = await fetchAndRegisterModel("Class");
    Subject = await fetchAndRegisterModel("Subject");
    Semester = await fetchAndRegisterModel("Semester");
    Teacher = await fetchAndRegisterModel("Teacher");
    Student = await fetchAndRegisterModel("Student");
    GradeSubject = await fetchAndRegisterModel("GradeSubject");
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

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Exams microservice running on port ${PORT}`);
});

/*
  [ ] get students' grades after they finish.
  [x] teacher get, update , delete  
*/
