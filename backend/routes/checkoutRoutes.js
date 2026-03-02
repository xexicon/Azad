const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  getSessionResult,
} = require("../controllers/checkoutController");

router.post("/create", createCheckoutSession);
router.get("/session/:sessionId", getSessionResult);

module.exports = router;