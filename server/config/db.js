const mongoose = require("mongoose");

module.exports = async () => {
  try {
    // Kết nối không cần options cho Mongoose 9+
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/real_estate",
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log(
      "Tip: Run 'Get-Service MongoDB' to check if MongoDB is running",
    );
    process.exit(1);
  }
};
