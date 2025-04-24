const axios = require("axios");
const moment = require("moment");
const { isArabic, translateDay } = require("../utils/languageDetector");

/**
 * Create system prompt for AI based on user's language and schedule data
 * @param {string} message - User message
 * @param {Object} scheduleData - Schedule data
 * @returns {string} - System prompt for AI
 */
const createSystemPrompt = (message, scheduleData) => {
  const messageIsArabic = isArabic(message);
  let systemContext = "";

  if (messageIsArabic) {
    systemContext =
      "أنت مساعد مدرسي ودود يساعد الطلاب. يجب الرد باللغة العربية على الأسئلة. ";
  } else {
    systemContext =
      "You are a friendly school assistant that helps students. Respond in English to questions. ";
  }

  if (
    !scheduleData ||
    !scheduleData.schedule ||
    Object.keys(scheduleData.schedule).length === 0
  ) {
    if (messageIsArabic) {
      systemContext +=
        "لم أتمكن من الوصول إلى جدولك الدراسي في الوقت الحالي. أستطيع مساعدتك بمعلومات عامة عن المدرسة والدراسة.";
    } else {
      systemContext +=
        "I couldn't access your schedule at the moment. I can help you with general information about school and studies.";
    }
    return systemContext;
  }

  const { schedule, academicInfo } = scheduleData;
  const today = moment().format("dddd");
  const todayTranslated = translateDay(today, messageIsArabic);

  if (messageIsArabic) {
    systemContext += `اليوم هو ${todayTranslated}. `;
    systemContext += "فيما يلي جدول الطالب للفصل الدراسي الحالي: \n\n";
  } else {
    systemContext += `Today is ${today}. `;
    systemContext +=
      "Here is the student's schedule for the current semester: \n\n";
  }

  Object.keys(schedule).forEach((day) => {
    const translatedDay = translateDay(day, messageIsArabic);
    systemContext += `${translatedDay}:\n`;

    schedule[day].forEach((lesson, index) => {
      if (messageIsArabic) {
        systemContext += `- الحصة ${index + 1}: ${
          lesson.subject
        } مع الأستاذ/ة ${lesson.teacher} (${lesson.startTime} - ${
          lesson.endTime
        })\n`;
      } else {
        systemContext += `- Period ${index + 1}: ${lesson.subject} with ${
          lesson.teacher
        } (${lesson.startTime} - ${lesson.endTime})\n`;
      }
    });

    systemContext += "\n";
  });

  if (academicInfo) {
    if (messageIsArabic) {
      systemContext += `العام الدراسي: ${academicInfo.academicYear.startYear}-${academicInfo.academicYear.endYear}, `;
      systemContext += `${academicInfo.semester}\n`;
      systemContext += `الصف: ${academicInfo.grade}, الفصل: ${academicInfo.class}\n\n`;
    } else {
      systemContext += `Academic Year: ${academicInfo.academicYear.startYear}-${academicInfo.academicYear.endYear}, `;
      systemContext += `${academicInfo.semester}\n`;
      systemContext += `Grade: ${academicInfo.grade}, Class: ${academicInfo.class}\n\n`;
    }
  }

  if (messageIsArabic) {
    systemContext +=
      "يمكنك الإجابة على أسئلة حول الجدول الدراسي والمعلومات الأكاديمية. ";
    systemContext +=
      "كما يمكنك الإجابة على أسئلة عامة حول المدرسة والدراسة والتعليم. ";
    systemContext += "قدم إجابات واضحة ومفيدة باللغة العربية.";
  } else {
    systemContext +=
      "You can answer questions about the schedule and academic information. ";
    systemContext +=
      "You can also answer general questions about school, studying, and education. ";
    systemContext += "Provide clear and helpful responses in English.";
  }

  return systemContext;
};

/**
 * Get AI response from OpenRouter API
 * @param {string} message - User message
 * @param {string} systemPrompt - System prompt
 * @returns {string} - AI response
 */
const getAIResponse = async (message, systemPrompt) => {
  try {
    console.log("AI API Request:", message);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.3,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
        },
        timeout: 8000,
      }
    );
    console.log("AI API Response:", response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI API Error:", error.message);
    throw new Error("Failed to get AI response");
  }
};

module.exports = {
  createSystemPrompt,
  getAIResponse,
};
