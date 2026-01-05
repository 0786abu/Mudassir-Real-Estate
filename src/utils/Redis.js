// src/utils/Redis.js
// import { Redis } from "ioredis";
// import dotenv from "dotenv";

const {Redis} = require("ioredis")
const dotenv = require("dotenv")
dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: {}, // required for rediss://
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error", err));

module.exports = redis;
