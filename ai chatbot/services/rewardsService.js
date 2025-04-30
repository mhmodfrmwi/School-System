const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");
/**
 * Fetch students rewards from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - rewards data or null if error
 */
const fetchStudentRewards = async (userId, authToken, lang = "en") => {
  try {
    const cacheKey = `rewards-${userId}-${authToken.substring(0, 10)}-${lang}`;
    const cachedRewards = cacheManager.get(cacheKey);

    if (cachedRewards) {
      return cachedRewards;
    }

    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/all-reward`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 20000,
      }
    );

    const rewards = formatRewardsForChatbot(response.data, lang);
    cacheManager.set(cacheKey, rewards);

    return rewards;
  } catch (error) {
    console.error(
      "Failed to fetch rewards:",
      error.response?.data || error.message
    );
    return {
      error:
        lang === "ar"
          ? "فشل في جلب بيانات المكافآت. يرجى المحاولة لاحقًا"
          : "Failed to fetch rewards. Please try again later",
    };
  }
};

const moment = require("moment");
const arabicLocale = require("moment/locale/ar");
const englishLocale = require("moment/locale/en-gb");

const formatRewardsForChatbot = (data, lang = "en") => {
  // Set moment locale
  moment.locale(lang === "ar" ? "ar" : "en");

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
    },
  };

  const t = translations[lang] || translations.en;

  const formatActivity = (activity) => {
    const action =
      activity.type === "add"
        ? t.earned.replace("{points}", activity.value)
        : t.spent.replace("{points}", activity.value);

    const reason = t.for.replace(
      "{reason}",
      activity.reason || (lang === "ar" ? "نشاط غير معروف" : "Unknown activity")
    );
    const date = t.on.replace("{date}", moment(activity.date).format("LL"));

    return `${action} ${reason} ${date}`;
  };

  return {
    student: {
      name: data.student.name,
      id: data.student.id,
      avatar: data.student.avatar,
    },
    points: {
      today: {
        period: t.today,
        total: data.points.today.total,
        activities:
          data.points.today.activities.length > 0
            ? data.points.today.activities.map(formatActivity)
            : [t.noActivities],
      },
      semester: {
        period: t.semester,
        total: data.points.semester.total,
        activities:
          data.points.semester.activities.length > 0
            ? data.points.semester.activities.map(formatActivity)
            : [t.noActivities],
      },
      total: data.points.total,
      badge: t.badge.replace("{badge}", data.points.badge),
    },
    leaderboard: {
      rank: t.yourRank.replace("{rank}", data.leaderboard.myRank),
      top: data.leaderboard.topStudents.map((student) =>
        t.leader
          .replace("{name}", student.name)
          .replace("{points}", student.points)
      ),
    },
  };
};

module.exports = {
  fetchStudentRewards,
  formatRewardsForChatbot,
};
