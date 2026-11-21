const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas / Local Database
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables (.env)");
    }

    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
