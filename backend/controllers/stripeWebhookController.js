const stripe = require("../config/stripe");
const Order = require("../models/Order");
const TicketInventory = require("../models/TicketInventory");
const { nanoid } = require("nanoid");
const { generateTicketPdf } = require("../utils/pdf");
const { uploadPdfBufferToCloudinary } = require("../utils/uploadPdf");
const { sendTicketEmail } = require("../utils/mailer");

async function assignTicketNoAtomically() {
  const inv = await TicketInventory.findOneAndUpdate(
    { _id: "TICKETS", nextTicketNo: { $lte: 100 } },
    { $inc: { nextTicketNo: 1 } },
    { new: true }
  );
  if (!inv) return null;
  return inv.nextTicketNo - 1;
}

async function releaseCapacityIfPending(orderId) {
  const order = await Order.findById(orderId);
  if (!order || order.status !== "pending") return;

  await Order.updateOne({ _id: orderId }, { $set: { status: "expired" } });
  await TicketInventory.updateOne({ _id: "TICKETS" }, { $inc: { remaining: 1 } });
}

const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Payment success
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (!orderId) return res.status(200).json({ received: true });

      const order = await Order.findById(orderId);
      if (!order) return res.status(200).json({ received: true });

      // Idempotent handling
      if (order.status === "paid" && order.pdfUrl && order.ticketNo) {
        return res.status(200).json({ received: true });
      }

      // If reserve expired, you still might get completion edge-case; handle safely:
      if (order.status !== "pending") {
        return res.status(200).json({ received: true });
      }

      // Assign ticket number now (clean numbering)
      const ticketNo = await assignTicketNoAtomically();
      if (!ticketNo) {
        console.error("No ticket numbers left while processing payment. Manual intervention needed.");
        // You may want to refund manually in this extreme case.
        return res.status(200).json({ received: true });
      }

      const ticketCode = `AZAD-${String(ticketNo).padStart(3, "0")}-${nanoid(6).toUpperCase()}`;

      const pdfBuffer = await generateTicketPdf({
        buyerName: order.buyer.name,
        ticketCode,
        ticketNo,
      });

      const publicId = `ticket_${ticketNo}_${ticketCode}`;
      const uploadRes = await uploadPdfBufferToCloudinary(pdfBuffer, publicId);

      // Mark paid + store ticket details
      order.status = "paid";
      order.ticketNo = ticketNo;
      order.ticketCode = ticketCode;
      order.pdfUrl = uploadRes.secure_url;
      await order.save();

      // Email PDF
      await sendTicketEmail({
        to: order.buyer.email,
        name: order.buyer.name,
        pdfBuffer,
        ticketCode,
        pdfUrl: order.pdfUrl,
      });

      return res.status(200).json({ received: true });
    }

    // Session expired -> release capacity
    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      if (orderId) await releaseCapacityIfPending(orderId);
      return res.status(200).json({ received: true });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    // returning 500 makes Stripe retry; good if transient error (cloudinary/resend down)
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};

module.exports = { stripeWebhookHandler };