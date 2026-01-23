const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const c = require("../controllers/analytics.controller");

router.post("/track", c.trackView);
router.get("/stats", auth, c.stats);

module.exports = router;
