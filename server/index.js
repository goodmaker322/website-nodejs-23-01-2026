require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

const seedAdmin = require("./config/seedAdmin");
seedAdmin();
app.use("/api/projects", require("./routes/project.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/contact", require("./routes/contact.route"));
app.use("/api/analytics", require("./routes/analytics.route"));
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./routes/upload.route"));
