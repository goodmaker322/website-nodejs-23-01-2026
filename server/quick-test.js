// quick-test.js
require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testing... URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Error:", err.message);
    console.log("\nQuick fix:");
    console.log("1. Run: mongosh");
    console.log("2. If mongosh works, MongoDB is running");
    console.log("3. If not, run: net start MongoDB");
    process.exit(1);
  });
