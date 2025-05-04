const Semester = require("../DB/semesterModel");
const nowSemesterId = async (academicYear_id) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    let semesterName = "Semester ";
    if (currentMonth >= 2 && currentMonth <= 7) {
      semesterName += "2";
    } else if (currentMonth >= 9 && currentMonth <= 12) {
      semesterName += "1";
    }
    const semester = await Semester.findOne({
      semesterName: semesterName,
      academicYear_id,
    });
    console.log(semester);

    if (!semester) {
      throw new Error("Semester not found");
    }
    return semester._id;
  } catch (error) {
    console.error("Error fetching current semester:", error);
    throw new Error("Failed to fetch current semester");
  }
};
module.exports = nowSemesterId;
