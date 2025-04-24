const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const chatRoutes = require("./routes/chatRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRoutes);
app.use("/api/schedule", scheduleRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
