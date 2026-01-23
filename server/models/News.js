const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
    thumbnail: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("News", newsSchema);
