const router = require("express").Router();
const c = require("../controllers/adminController");
const { protect, allow } = require("../middleware/auth");
router.use(protect, allow("admin"));
router.get("/summary", c.summary);
router.get("/farmers", c.farmers);
router.patch("/farmers/:id/approve", c.approveFarmer);
router.delete("/products/:id", c.removeProduct);
module.exports = router;
