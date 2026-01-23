const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    investor: String,
    price: String,
    legal: String,
    status: {
      type: String,
      enum: ["dang-trien-khai", "sap-ra-mat", "da-hoan-thanh"],
    },
    images: [String],
    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
