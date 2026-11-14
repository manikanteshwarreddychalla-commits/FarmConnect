const router = require("express").Router();
const c = require("../controllers/orderController");
const { protect, allow } = require("../middleware/auth");
router.post("/", protect, allow("customer"), c.create);
router.get("/my", protect, allow("customer", "farmer"), c.mine);
router.patch("/:id/status", protect, allow("farmer"), c.updateStatus);
module.exports = router;
