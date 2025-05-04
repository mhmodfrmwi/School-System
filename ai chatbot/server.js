const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandler");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const app = express();

// Manual CORS handling instead of the cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }

  next();
});

app.use(express.json());

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Add a simple test route to debug CORS
app.get("/api/test", (req, res) => {
  console.log("Test endpoint hit");
  res.status(200).json({ message: "CORS test successful" });
});

// Apply routes
app.use("/api/chat", chatRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Chatbot Server is running" });
});

// Handle 404 errors for routes that don't exist
app.use((req, res) => {
  console.log(`404 for ${req.method} ${req.path}`);
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

// Use a different port to avoid conflicts with the Python server
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001
app.listen(PORT, () =>
  console.log(`✅ Chatbot Server running on port ${PORT}`)
);
