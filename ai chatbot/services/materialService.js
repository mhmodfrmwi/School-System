const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");
/**
 * Fetch subjects materials from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - material data or null if error
 */
const fetchSubjectsMaterials = async (userId, authToken) => {
  try {
    const cacheKey = `materials-${userId}-${authToken.substring(0, 10)}`;
    const cachedMaterials = cacheManager.get(cacheKey);

    if (cachedMaterials) {
      return formatMaterialsForChatbot(cachedMaterials);
    }

    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/material/grade`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 10000,
      }
    );

    const materials = response.data.materials;
    cacheManager.set(cacheKey, materials);

    return formatMaterialsForChatbot(materials);
  } catch (error) {
    console.error(
      "Failed to fetch materials:",
      error.response?.data || error.message
    );
    return "Sorry, I couldn't fetch your materials. Please try again later.";
  }
};
const formatMaterialsForChatbot = (materials, isArabic = false) => {
  if (!materials || materials.length === 0) {
    return isArabic ? "لا توجد مواد متاحة." : "No materials found.";
  }

  const formattedMaterials = materials.map((material) => {
    const subject =
      material.grade_subject_semester_id?.grade_subject_id?.subjectId
        ?.subjectName || (isArabic ? "مادة غير معروفة" : "Unknown Subject");
    const grade =
      material.grade_subject_semester_id?.grade_subject_id?.gradeId
        ?.gradeName || (isArabic ? "صف غير معروف" : "Unknown Grade");
    const type = material.type || (isArabic ? "نوع غير معروف" : "Unknown Type");
    const url = material.file_url || "#";

    return isArabic
      ? `📚 *${material.title}*  
         - **المادة:** ${subject}  
         - **الصف:** ${grade}  
         - **النوع:** ${type}  
         - **الرابط:** [عرض المادة](${url})  
         - **الوصف:** ${material.description || "لا يوجد وصف"}`
      : `📚 *${material.title}*  
         - **Subject:** ${subject}  
         - **Grade:** ${grade}  
         - **Type:** ${type}  
         - **Link:** [View Material](${url})  
         - **Description:** ${material.description || "No description"}`;
  });

  return formattedMaterials.join("\n\n");
};
module.exports = {
  fetchSubjectsMaterials,
};
