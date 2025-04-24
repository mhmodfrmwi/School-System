/**
 * Utility functions for language detection
 */

/**
 * Detects if text contains Arabic characters
 * @param {string} text - Text to analyze
 * @returns {boolean} - True if text contains Arabic characters
 */
const isArabic = (text) => {
  if (!text || typeof text !== "string") return false;
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

/**
 * Translates day names to Arabic if needed
 * @param {string} day - English day name
 * @param {boolean} toArabic - Whether to translate to Arabic
 * @returns {string} - Translated day name or original
 */
const translateDay = (day, toArabic) => {
  if (!toArabic) return day;

  const dayTranslations = {
    Monday: "الإثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
    Sunday: "الأحد",
  };

  return dayTranslations[day] || day;
};

module.exports = {
  isArabic,
  translateDay,
};
