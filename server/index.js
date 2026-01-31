require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

const app = express();

// 1. Kết nối database
connectDB();

// 2. CORS cấu hình chi tiết
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 3. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Tạo thư mục uploads nếu chưa tồn tại
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads directory");
}

// 5. Phục vụ file tĩnh từ thư mục uploads (PHẢI ĐỂ TRƯỚC CÁC ROUTES)
app.use("/uploads", express.static(uploadsDir));

// 6. Các routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/projects", require("./routes/project.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/contact", require("./routes/contact.route"));
app.use("/api/analytics", require("./routes/analytics.route"));
app.use("/api/upload", require("./routes/upload.route")); // Route upload ảnh

// 7. Route test server
app.get("/", (req, res) => {
  res.json({ message: "Server is running", uploads: uploadsDir });
});

// 8. Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// 9. Xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 10. Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🌐 Frontend: http://localhost:3000`);
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/upload`);
});

// 11. Seed admin (nếu cần)
const seedAdmin = require("./config/seedAdmin");
seedAdmin();
