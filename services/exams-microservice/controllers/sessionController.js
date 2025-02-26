const Session = require("../models/Session");

const startSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to start session" });
  }
};

module.exports = { startSession };
