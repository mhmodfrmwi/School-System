const axios = require("axios");
const moment = require("moment");
const { isArabic, translateDay } = require("../utils/languageDetector");

/**
 * Create system prompt for AI based on user's language and context data
 * @param {string} message - User message
 * @param {Object} contextData - Any contextual data to include in the prompt
 * @param {Object} options - Configuration options
 * @param {string} options.assistantRole - Role description for the AI assistant
 * @param {boolean} options.includeDatetime - Whether to include current date/time
 * @param {function} options.formatContextData - Function to format context data
 * @returns {string} - System prompt for AI
 */
const createSystemPrompt = (
  message,
  contextData = {},
  options = {
    assistantRole: "helpful assistant",
    includeDatetime: false,
    formatContextData: null,
  }
) => {
  const messageIsArabic = isArabic(message);
  let systemContext = "";

  // Set assistant role based on language
  if (messageIsArabic) {
    systemContext =
      "أنت مساعد " +
      options.assistantRole +
      ". يجب الرد باللغة العربية على الأسئلة.";
  } else {
    systemContext = `You are a ${options.assistantRole}. Respond in English to questions.`;
  }

  // Add current date/time if requested
  if (options.includeDatetime) {
    const today = moment().format("dddd");
    const todayTranslated = messageIsArabic
      ? translateDay(today, messageIsArabic)
      : today;
    const dateFormatted = moment().format("MMMM D, YYYY");
    const timeFormatted = moment().format("HH:mm");

    if (messageIsArabic) {
      systemContext += `\nاليوم هو ${todayTranslated}, ${dateFormatted}. الوقت الحالي هو ${timeFormatted}.`;
    } else {
      systemContext += `\nToday is ${today}, ${dateFormatted}. The current time is ${timeFormatted}.`;
    }
  }

  // Check if we have valid context data
  if (!contextData || Object.keys(contextData).length === 0) {
    if (messageIsArabic) {
      systemContext +=
        "\nلا تتوفر لدي أي بيانات سياقية محددة في الوقت الحالي. يمكنني مساعدتك بمعلومات عامة.";
    } else {
      systemContext +=
        "\nI don't have any specific contextual data available at the moment. I can help you with general information.";
    }
    return systemContext;
  }

  // Format context data using custom formatter if provided
  if (typeof options.formatContextData === "function") {
    const formattedData = options.formatContextData(
      contextData,
      messageIsArabic
    );
    systemContext += `\n\n${formattedData}`;
  } else {
    // Default formatting: simple JSON stringification with language adaptation
    const dataDescription = messageIsArabic
      ? "فيما يلي البيانات السياقية المتاحة:"
      : "Here is the available context data:";

    systemContext += `\n\n${dataDescription}\n`;
    systemContext += JSON.stringify(contextData, null, 2);
  }

  // Add closing instructions
  if (messageIsArabic) {
    systemContext += "\n\nقدم إجابات واضحة ومفيدة استنادًا إلى السياق المتاح.";
  } else {
    systemContext +=
      "\n\nProvide clear and helpful responses based on the available context.";
  }

  return systemContext;
};

/**
 * Format schedule data for inclusion in system prompt
 * @param {Object} scheduleData - Schedule data object
 * @param {boolean} isArabic - Whether to format in Arabic
 * @returns {string} - Formatted schedule data
 */
const formatScheduleData = (scheduleData, isArabic) => {
  let formatted = "";
  const { schedule, academicInfo } = scheduleData;

  if (!schedule || Object.keys(schedule).length === 0) {
    return isArabic
      ? "لا توجد بيانات جدول متاحة."
      : "No schedule data available.";
  }

  const today = moment().format("dddd");
  const todayTranslated = translateDay(today, isArabic);

  if (isArabic) {
    formatted += `اليوم هو ${todayTranslated}.\n`;
    formatted += "فيما يلي جدول الطالب للفصل الدراسي الحالي:\n\n";
  } else {
    formatted += `Today is ${today}.\n`;
    formatted += "Here is the student's schedule for the current semester:\n\n";
  }

  Object.keys(schedule).forEach((day) => {
    const translatedDay = translateDay(day, isArabic);
    formatted += `${translatedDay}:\n`;

    schedule[day].forEach((lesson, index) => {
      if (isArabic) {
        formatted += `- الحصة ${index + 1}: ${lesson.subject} مع الأستاذ/ة ${
          lesson.teacher
        } (${lesson.startTime} - ${lesson.endTime})\n`;
      } else {
        formatted += `- Period ${index + 1}: ${lesson.subject} with ${
          lesson.teacher
        } (${lesson.startTime} - ${lesson.endTime})\n`;
      }
    });

    formatted += "\n";
  });

  if (academicInfo) {
    if (isArabic) {
      formatted += `العام الدراسي: ${academicInfo.academicYear.startYear}-${academicInfo.academicYear.endYear}, `;
      formatted += `${academicInfo.semester}\n`;
      formatted += `الصف: ${academicInfo.grade}, الفصل: ${academicInfo.class}\n\n`;
    } else {
      formatted += `Academic Year: ${academicInfo.academicYear.startYear}-${academicInfo.academicYear.endYear}, `;
      formatted += `${academicInfo.semester}\n`;
      formatted += `Grade: ${academicInfo.grade}, Class: ${academicInfo.class}\n\n`;
    }
  }

  return formatted;
};

/**
 * Format customer data for inclusion in system prompt - example of another formatter
 * @param {Object} customerData - Customer related data
 * @param {boolean} isArabic - Whether to format in Arabic
 * @returns {string} - Formatted customer data
 */
const formatCustomerData = (customerData, isArabic) => {
  let formatted = "";
  const { profile, orders, supportHistory } = customerData;

  if (!profile) {
    return isArabic
      ? "لا توجد بيانات العميل متاحة."
      : "No customer data available.";
  }

  if (isArabic) {
    formatted += "معلومات العميل:\n";
    formatted += `الاسم: ${profile.name}\n`;
    formatted += `البريد الإلكتروني: ${profile.email}\n`;
    formatted += `رقم الهاتف: ${profile.phone || "غير متوفر"}\n`;
    formatted += `تاريخ التسجيل: ${
      profile.registrationDate || "غير متوفر"
    }\n\n`;
  } else {
    formatted += "Customer Information:\n";
    formatted += `Name: ${profile.name}\n`;
    formatted += `Email: ${profile.email}\n`;
    formatted += `Phone: ${profile.phone || "Not available"}\n`;
    formatted += `Registration Date: ${
      profile.registrationDate || "Not available"
    }\n\n`;
  }

  if (orders && orders.length > 0) {
    if (isArabic) {
      formatted += "الطلبات الأخيرة:\n";
      orders.slice(0, 3).forEach((order, index) => {
        formatted += `${index + 1}. رقم الطلب: ${order.id}, التاريخ: ${
          order.date
        }, الحالة: ${order.status}, المبلغ: ${order.amount}\n`;
      });
      formatted += "\n";
    } else {
      formatted += "Recent Orders:\n";
      orders.slice(0, 3).forEach((order, index) => {
        formatted += `${index + 1}. Order #${order.id}, Date: ${
          order.date
        }, Status: ${order.status}, Amount: ${order.amount}\n`;
      });
      formatted += "\n";
    }
  }

  if (supportHistory && supportHistory.length > 0) {
    if (isArabic) {
      formatted += "تاريخ الدعم:\n";
      supportHistory.slice(0, 3).forEach((ticket, index) => {
        formatted += `${index + 1}. تذكرة #${ticket.id}, التاريخ: ${
          ticket.date
        }, الموضوع: ${ticket.subject}, الحالة: ${ticket.status}\n`;
      });
    } else {
      formatted += "Support History:\n";
      supportHistory.slice(0, 3).forEach((ticket, index) => {
        formatted += `${index + 1}. Ticket #${ticket.id}, Date: ${
          ticket.date
        }, Subject: ${ticket.subject}, Status: ${ticket.status}\n`;
      });
    }
  }

  return formatted;
};

/**
 * Get AI response from API
 * @param {string} message - User message
 * @param {string} systemPrompt - System prompt
 * @param {Object} options - API configuration options
 * @param {string} options.model - AI model to use
 * @param {number} options.temperature - Response temperature (0-1)
 * @param {number} options.maxTokens - Maximum tokens to generate
 * @param {string} options.apiEndpoint - API endpoint URL
 * @param {Object} options.headers - Custom headers for API request
 * @returns {string} - AI response
 */
const getAIResponse = async (
  message,
  systemPrompt,
  options = {
    model: "mistralai/mistral-7b-instruct",
    temperature: 0.3,
    maxTokens: 500,
    apiEndpoint: "https://openrouter.ai/api/v1/chat/completions",
    headers: {},
  }
) => {
  try {
    console.log("AI API Request:", message);

    const defaultHeaders = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
    };

    const response = await axios.post(
      options.apiEndpoint,
      {
        model: options.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      },
      {
        headers: { ...defaultHeaders, ...options.headers },
        timeout: 10000,
      }
    );

    console.log("AI API Response:", response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI API Error:", error.message);
    throw new Error("Failed to get AI response: " + error.message);
  }
};


module.exports = {
  createSystemPrompt,
  getAIResponse,
  formatScheduleData,
  formatCustomerData,
};
