const router = require("express").Router();
const c = require("../controllers/productController");
const { protect, allow } = require("../middleware/auth");
router.get("/", c.list);
router.get("/mine", protect, allow("farmer"), c.mine);
router.post("/", protect, allow("farmer"), c.create);
router.put("/:id", protect, allow("farmer"), c.update);
router.delete("/:id", protect, allow("farmer"), c.remove);
module.exports = router;
