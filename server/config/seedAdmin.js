const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async () => {
  const admin = await User.findOne({ username: "admin" });
  if (!admin) {
    const hash = await bcrypt.hash("admin123", 10);
    await User.create({ username: "admin", password: hash });
    console.log("Admin created");
  }
};
