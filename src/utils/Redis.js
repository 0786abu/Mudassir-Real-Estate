
// src/utils/redis.js
const dotenv = require("dotenv");
dotenv.config();

const connection = {
  url: process.env.UPSTASH_REDIS_URL,
  maxRetriesPerRequest: null,
};

module.exports = connection;
