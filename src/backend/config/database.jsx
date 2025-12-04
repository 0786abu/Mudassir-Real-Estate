import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URL is missing in .env");
}

let isConnected = false;

export const DataBase = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("🚀 MongoDB connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
};
