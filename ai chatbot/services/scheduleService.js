const axios = require("axios");
const moment = require("moment");
const cacheManager = require("../utils/cacheManager");

const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";

/**
 * Fetch student schedule from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - Schedule data or null if error
 */
const fetchStudentSchedule = async (userId, authToken) => {
  try {
    const cacheKey = `schedule-${userId}-${authToken.substring(0, 10)}`;
    const cachedSchedule = cacheManager.get(cacheKey);

    if (cachedSchedule) {
      return cachedSchedule;
    }

    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/get-schedule`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 8000,
      }
    );

    const schedules = response.data.schedules;

    cacheManager.set(cacheKey, schedules);

    return schedules;
  } catch (error) {
    console.error(
      "Failed to fetch schedule:",
      error.response?.data || error.message
    );
    return null;
  }
};

/**
 * Organize schedule data by day
 * @param {Array} schedules - Raw schedule data
 * @returns {Object} - Organized schedule by day
 */
const organizeScheduleByDay = (schedules) => {
  if (!schedules || !Array.isArray(schedules)) {
    return {};
  }

  const scheduleByDay = {};

  schedules.forEach((schedule) => {
    const day = schedule.day_of_week;

    if (!scheduleByDay[day]) {
      scheduleByDay[day] = [];
    }

    scheduleByDay[day].push({
      subject: schedule.subject_id.subjectName,
      teacher: schedule.teacher_id.fullName,
      startTime: schedule.start_time,
      endTime: schedule.end_time,
      classroom: schedule.class_id.className,
      grade: schedule.grade_id.gradeName,
    });
  });

  Object.keys(scheduleByDay).forEach((day) => {
    scheduleByDay[day].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  });

  return scheduleByDay;
};

/**
 * Get student schedule for today
 * @param {Array} schedules - Raw schedule data
 * @returns {Array} - Today's schedule
 */
const getTodaySchedule = (schedules) => {
  if (!schedules || !Array.isArray(schedules)) {
    return [];
  }

  const today = moment().format("dddd");
  const organizedSchedule = organizeScheduleByDay(schedules);

  return organizedSchedule[today] || [];
};

/**
 * Get academic information from schedule
 * @param {Array} schedules - Raw schedule data
 * @returns {Object} - Academic information
 */
const getAcademicInfo = (schedules) => {
  if (!schedules || !Array.isArray(schedules) || !schedules[0]) {
    return null;
  }

  const schedule = schedules[0];

  return {
    academicYear: {
      startYear: schedule.academic_year_id.startYear,
      endYear: schedule.academic_year_id.endYear,
    },
    semester: schedule.semester_id.semesterName,
    grade: schedule.grade_id.gradeName,
    class: schedule.class_id.className,
  };
};

module.exports = {
  fetchStudentSchedule,
  organizeScheduleByDay,
  getTodaySchedule,
  getAcademicInfo,
};
