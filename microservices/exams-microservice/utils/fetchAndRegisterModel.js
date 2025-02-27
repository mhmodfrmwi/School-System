const axios = require("axios");
const mongoose = require("mongoose");

const SCHOOL_SYSTEM_URL =
  process.env.SCHOOL_SYSTEM_URL || "http://localhost:4000";

const fetchAndRegisterModel = async (modelName) => {
  try {
    const response = await axios.get(
      `${SCHOOL_SYSTEM_URL}/api/v1/expose-models/${modelName}`
    );
    const schemaDefinition = response.data;
    const schema = new mongoose.Schema(schemaDefinition);

    return mongoose.model(modelName, schema);
  } catch (err) {
    console.error(`Failed to fetch and register ${modelName}:`, err.message);
    throw err;
  }
};

module.exports = fetchAndRegisterModel;
