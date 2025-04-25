// utils/upload.js
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/students"); // Files will be saved in "./uploads/students/"
  },
  filename: (req, file, cb) => {
    // Rename file to avoid conflicts (timestamp + original name)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

// Initialize multer with the configuration
const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  // Optional: Limit file size (e.g., 5MB)
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = uploadImage;