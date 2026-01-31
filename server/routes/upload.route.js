const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  },
});

// Kiểm tra file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter,
});

// Route upload ảnh
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Không có file được tải lên" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Lỗi server khi upload" });
  }
});

// Upload nhiều ảnh
router.post("/multiple", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Không có file nào được tải lên" });
    }

    const urls = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
    }));

    res.json({
      success: true,
      message: `Upload thành công ${req.files.length} ảnh`,
      urls: urls,
    });
  } catch (error) {
    console.error("Upload multiple error:", error);
    res.status(500).json({ error: "Lỗi khi upload nhiều ảnh" });
  }
});

// Xóa ảnh
router.delete("/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: `Đã xóa ảnh ${filename}` });
    } else {
      res.status(404).json({ error: "File không tồn tại" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Lỗi khi xóa file" });
  }
});

module.exports = router;
