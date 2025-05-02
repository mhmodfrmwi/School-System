const axios = require("axios");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const cacheManager = require("../utils/cacheManager");

// Configure dayjs
dayjs.extend(localizedFormat);

// Load localizations
require("dayjs/locale/ar");
require("dayjs/locale/en");

// Environment variables
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const CACHE_TTL = parseInt(process.env.REWARDS_CACHE_TTL || 3600); // Default: 1 hour

/**
 * Translations for reward responses
 */
const translations = {
  en: {
    today: "Today",
    semester: "This Semester",
    total: "All Time Total",
    earned: "Earned {points} points",
    spent: "Spent {points} points",
    for: "for {reason}",
    on: "on {date}",
    yourRank: "You're ranked #{rank}",
    leader: "Leader: {name} with {points} points",
    badge: "Your badge: {badge}",
    noActivities: "No activities yet",
    errorFetching: "Failed to fetch rewards. Please try again later",
    unknownActivity: "Unknown activity",
  },
  ar: {
    today: "اليوم",
    semester: "هذا الفصل الدراسي",
    total: "المجموع الكلي",
    earned: "كسبت {points} نقطة",
    spent: "أنفقت {points} نقطة",
    for: "لـ {reason}",
    on: "في {date}",
    yourRank: "ترتيبك هو #{rank}",
    leader: "المتصدر: {name} بـ {points} نقطة",
    badge: "شارتك: {badge}",
    noActivities: "لا توجد أنشطة بعد",
    errorFetching: "فشل في جلب بيانات المكافآت. يرجى المحاولة لاحقًا",
    unknownActivity: "نشاط غير معروف",
  },
};

/**
 * Format a date safely with fallback handling
 * @param {string|Date} dateInput - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - Formatted date string
 */
const formatDate = (dateInput, locale = "en") => {
  try {
    return dayjs(dateInput)
      .locale(locale === "ar" ? "ar" : "en")
      .format("LL");
  } catch (error) {
    console.warn(`Date formatting error: ${error.message}`, { dateInput });
    // Return a fallback formatted date or the original
    return dateInput instanceof Date
      ? dateInput.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US")
      : dateInput;
  }
};

/**
 * Format activity data for chatbot consumption
 * @param {Object} activity - Single activity data
 * @param {Object} t - Translation object
 * @param {string} locale - The locale to use
 * @returns {string} - Formatted activity string
 */
const formatActivity = (activity, t, locale) => {
  const action =
    activity.type === "add"
      ? t.earned.replace("{points}", activity.value)
      : t.spent.replace("{points}", activity.value);

  const reason = t.for.replace(
    "{reason}",
    activity.reason || t.unknownActivity
  );

  const date = t.on.replace("{date}", formatDate(activity.date, locale));

  return `${action} ${reason} ${date}`;
};

/**
 * Format rewards data for chatbot consumption
 * @param {Object} data - Raw rewards data from API
 * @param {string} lang - Language code (en or ar)
 * @returns {Object} - Formatted rewards data
 */
const formatRewardsForChatbot = (data, lang = "en") => {
  const t = translations[lang] || translations.en;
  const locale = ["ar", "en"].includes(lang) ? lang : "en";

  // Validate data structure to prevent errors
  if (!data?.student || !data?.points || !data?.leaderboard) {
    console.error("Invalid rewards data structure", { data });
    return { error: t.errorFetching };
  }

  // Process activities safely
  const formatActivitiesSafely = (activities = []) => {
    if (!Array.isArray(activities) || activities.length === 0) {
      return [t.noActivities];
    }

    return activities.map((activity) => formatActivity(activity, t, locale));
  };

  return {
    student: {
      name: data.student.name || "",
      id: data.student.id || "",
      avatar: data.student.avatar || "",
    },
    points: {
      today: {
        period: t.today,
        total: data.points.today?.total || 0,
        activities: formatActivitiesSafely(data.points.today?.activities),
      },
      semester: {
        period: t.semester,
        total: data.points.semester?.total || 0,
        activities: formatActivitiesSafely(data.points.semester?.activities),
      },
      total: data.points.total || 0,
      badge: t.badge.replace("{badge}", data.points.badge || ""),
    },
    leaderboard: {
      rank: t.yourRank.replace("{rank}", data.leaderboard.myRank || "-"),
      top: Array.isArray(data.leaderboard.topStudents)
        ? data.leaderboard.topStudents.map((student) =>
            t.leader
              .replace("{name}", student.name || "")
              .replace("{points}", student.points || 0)
          )
        : [],
    },
  };
};

/**
 * Generate a unique cache key for rewards requests
 * @param {string} userId - User ID
 * @param {string} authToken - Auth token
 * @param {string} lang - Language
 * @returns {string} - Cache key
 */
const generateCacheKey = (userId, authToken, lang) => {
  const tokenHash = authToken.substring(0, 10);
  return `rewards-${userId}-${tokenHash}-${lang}`;
};

/**
 * Fetch student rewards from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @param {string} lang - Language code (en or ar)
 * @returns {Object} - Rewards data or error object
 */
const fetchStudentRewards = async (userId, authToken, lang = "en") => {
  if (!userId || !authToken) {
    return {
      error:
        lang === "ar"
          ? "معرف المستخدم ورمز المصادقة مطلوبان"
          : "User ID and auth token are required",
    };
  }

  try {
    const cacheKey = generateCacheKey(userId, authToken, lang);
    const cachedRewards = cacheManager.get(cacheKey);

    if (cachedRewards) {
      return cachedRewards;
    }

    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/all-reward`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 20000,
        params: { lang }, // Pass language to API if it supports it
      }
    );

    if (!response.data) {
      throw new Error("Empty response from rewards API");
    }
    
    
    const rewards = formatRewardsForChatbot(response.data, lang);

    // Cache the result
    cacheManager.set(cacheKey, rewards, CACHE_TTL);

    return rewards;
  } catch (error) {
    console.error(
      "Failed to fetch rewards:",
      error.response?.data || error.message,
      {
        userId,
        statusCode: error.response?.status,
        url: `${SCHOOL_API_BASE}/api/v1/student/all-reward`,
      }
    );

    const t = translations[lang] || translations.en;
    return { error: t.errorFetching };
  }
};

module.exports = {
  fetchStudentRewards,
  formatRewardsForChatbot,
};
