const aiService = require("../services/aiService");
const rewardsService = require("../services/rewardsService");
const { isArabic } = require("./languageDetector");
const rewardsPrompt = async (message, authToken, userId) => {
  const lang = isArabic(message) ? "ar" : "en";
  const rewards = await rewardsService.fetchStudentRewards(
    userId,
    authToken,
    lang
  );

  if (rewards.error) {
    return rewards.error;
  }

  const response = [
    `${lang === "ar" ? "نقاطك:" : "Your points:"}`,
    `- ${rewards.points.today.period}: ${rewards.points.today.total}`,
    `  ${rewards.points.today.activities.join("\n  ")}`,
    `- ${rewards.points.semester.period}: ${rewards.points.semester.total}`,
    `- ${rewards.points.badge}`,
    ``,
    `${rewards.leaderboard.rank}`,
    `${rewards.leaderboard.top.join("\n")}`,
  ].join("\n");

  return response;
};
module.exports = rewardsPrompt;
