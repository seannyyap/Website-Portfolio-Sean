const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in environment variables');
    console.log('⚠️  Server will start but database operations will fail');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Server will continue running, but database operations will fail');
    console.log('💡 Make sure MongoDB is running or check your MONGODB_URI in .env file');
    // Don't exit - allow server to start even without DB connection
  }
};

module.exports = connectDB;

