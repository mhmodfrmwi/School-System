const asyncHandler = require("express-async-handler");
const { isArabic, translateDay } = require("../utils/languageDetector");
const scheduleService = require("../services/scheduleService");
const apiResponse = require("../utils/apiResponse");
const moment = require("moment");

/**
 * Get student schedule
 * @route GET /api/schedule
 * @access Private
 */
const getSchedule = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const authToken = req.authToken;

  if (!userId) {
    return apiResponse.error(res, 400, "User ID is required");
  }

  const schedules = await scheduleService.fetchStudentSchedule(
    userId,
    authToken
  );

  if (!schedules) {
    return apiResponse.error(res, 404, "Schedule not found");
  }

  const organizedSchedule = scheduleService.organizeScheduleByDay(schedules);
  const academicInfo = scheduleService.getAcademicInfo(schedules);

  return apiResponse.success(res, 200, "Schedule retrieved successfully", {
    schedule: organizedSchedule,
    academicInfo,
  });
});

/**
 * Get today's schedule
 * @route GET /api/schedule/today
 * @access Private
 */
const getTodaySchedule = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const authToken = req.authToken;

  if (!userId) {
    return apiResponse.error(res, 400, "User ID is required");
  }

  const schedules = scheduleService.fetchStudentSchedule(userId, authToken);

  if (!schedules) {
    return apiResponse.error(res, 404, "Schedule not found");
  }

  const today = moment().format("dddd");
  const organizedSchedule = scheduleService.organizeScheduleByDay(schedules);
  const todaySchedule = organizedSchedule[today] || [];

  return apiResponse.success(
    res,
    200,
    "Today's schedule retrieved successfully",
    {
      day: today,
      schedule: todaySchedule,
    }
  );
});

/**
 * Get schedule for specific day
 * @route GET /api/schedule/day/:day
 * @access Private
 */
const getDaySchedule = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const day = req.params.day;
  const authToken = req.authToken;

  if (!userId) {
    return apiResponse.error(res, 400, "User ID is required");
  }

  const schedules = await scheduleService.fetchStudentSchedule(
    userId,
    authToken
  );

  if (!schedules) {
    return apiResponse.error(res, 404, "Schedule not found");
  }

  const organizedSchedule = scheduleService.organizeScheduleByDay(schedules);
  const daySchedule = organizedSchedule[day] || [];

  return apiResponse.success(
    res,
    200,
    `Schedule for ${day} retrieved successfully`,
    {
      day,
      schedule: daySchedule,
    }
  );
});

module.exports = {
  getSchedule,
  getTodaySchedule,
  getDaySchedule,
};
