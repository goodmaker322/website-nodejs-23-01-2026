const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema({
  page: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PageView", pageViewSchema);
