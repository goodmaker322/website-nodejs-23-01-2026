const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.post("/", auth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
