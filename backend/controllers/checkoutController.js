const stripe = require("../config/stripe");
const Order = require("../models/Order");
const TicketInventory = require("../models/TicketInventory");

const TICKET_PRICE_USD_CENTS = 3000_00; // $3000.00
const RESERVE_MINUTES = 30;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function releaseCapacityOnce(order) {
  // release only if order was pending
  if (!order || order.status !== "pending") return;

  await Order.updateOne({ _id: order._id }, { $set: { status: "expired" } });
  await TicketInventory.updateOne({ _id: "TICKETS" }, { $inc: { remaining: 1 } });
}

const createCheckoutSession = async (req, res) => {
  try {
    const { personalDetails, shippingDetails } = req.body || {};

    const buyer = {
      name: String(personalDetails?.name || "").trim(),
      email: normalizeEmail(personalDetails?.email),
      phone: String(personalDetails?.phone || "").trim(),
      country: String(personalDetails?.country || "").trim(),
      companyOrInstitution: String(personalDetails?.companyOrInstitution || "").trim(),
    };

    if (!buyer.name || !buyer.email || !buyer.phone || !buyer.country) {
      return res.status(400).json({ error: "Missing required personal details" });
    }

    // Block if already PAID
    const alreadyPaid = await Order.findOne({ "buyer.email": buyer.email, status: "paid" }).lean();
    if (alreadyPaid) {
      return res.status(409).json({ error: "This email has already purchased a ticket." });
    }

    // If there is a pending order, allow retry only if it expired
    const pending = await Order.findOne({ "buyer.email": buyer.email, status: "pending" });
    if (pending) {
      if (pending.reservedUntil > new Date()) {
        return res.status(409).json({ error: "You already have a pending checkout. Please complete payment." });
      }
      // expired pending -> release capacity
      await releaseCapacityOnce(pending);
    }

    // Reserve capacity (NO ticketNo here)
    const inv = await TicketInventory.findOneAndUpdate(
      { _id: "TICKETS", remaining: { $gt: 0 } },
      { $inc: { remaining: -1 } },
      { new: true }
    );

    if (!inv) return res.status(409).json({ error: "All tickets are sold out." });

    const reservedUntil = new Date(Date.now() + RESERVE_MINUTES * 60 * 1000);

    const order = await Order.create({
      buyer,
      shipping: {
        postalCode: String(shippingDetails?.postalCode || "").trim(),
        address1: String(shippingDetails?.address1 || "").trim(),
        address2: String(shippingDetails?.address2 || "").trim(),
        country: String(shippingDetails?.country || "").trim(),
        companyOrInstitution: String(shippingDetails?.companyOrInstitution || "").trim(),
      },
      status: "pending",
      reservedUntil,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: buyer.email,

      // Auto-expire checkout session around your reserve window
      expires_at: Math.floor(reservedUntil.getTime() / 1000),

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: TICKET_PRICE_USD_CENTS,
            product_data: {
              name: "Event Ticket",
              description: "One ticket per email. Limited to 100 tickets.",
            },
          },
        },
      ],

      metadata: {
        orderId: String(order._id),
        buyerEmail: buyer.email,
      },

      success_url: `${process.env.CLIENT_URL}/ticket-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/ticket-cancelled`,
    });

    await Order.updateOne({ _id: order._id }, { $set: { stripeSessionId: session.id } });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSessionResult = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const order = await Order.findOne({ stripeSessionId: sessionId }).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });

    return res.json({
      status: order.status,
      ticketNo: order.ticketNo,
      ticketCode: order.ticketCode,
      pdfUrl: order.pdfUrl,
    });
  } catch (err) {
    console.error("getSessionResult error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getSessionResult, createCheckoutSession };