const PageView = require("../models/PageView");

exports.trackView = async (req, res) => {
  const { page } = req.body;
  await PageView.create({
    page,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  res.json({ success: true });
};

exports.stats = async (req, res) => {
  const now = new Date();

  const start7 = new Date(now);
  start7.setDate(now.getDate() - 7);

  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startYear = new Date(now.getFullYear(), 0, 1);

  const [day7, month, year] = await Promise.all([
    PageView.countDocuments({ createdAt: { $gte: start7 } }),
    PageView.countDocuments({ createdAt: { $gte: startMonth } }),
    PageView.countDocuments({ createdAt: { $gte: startYear } }),
  ]);

  res.json({
    last7Days: day7,
    thisMonth: month,
    thisYear: year,
  });
};
