const express = require("express");
const router = express.Router();
const {
  stripeWebhookHandler,
} = require("../controllers/stripeWebhookController");

// IMPORTANT: Stripe webhook needs RAW body (not express.json)
router.post("/stripe", express.raw({ type: "application/json" }), stripeWebhookHandler);

module.exports = router;