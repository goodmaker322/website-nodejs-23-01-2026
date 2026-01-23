const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const c = require("../controllers/project.controller");

router.get("/", c.getAll);
router.get("/:slug", c.getOne);
router.post("/", auth, c.create);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;
