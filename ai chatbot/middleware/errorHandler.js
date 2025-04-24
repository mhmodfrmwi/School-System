/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const isArabic = /[\u0600-\u06FF]/.test(req.body?.message || "");

  const errorMessage = isArabic
    ? "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا."
    : "Sorry, an error occurred. Please try again later.";

  console.error(`[ERROR] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
