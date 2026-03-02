const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true }, // ✅ removed index:true
      phone: { type: String, required: true },
      country: { type: String, required: true },
      companyOrInstitution: { type: String, default: "" },
    },
    shipping: {
      postalCode: { type: String, default: "" },
      address1: { type: String, default: "" },
      address2: { type: String, default: "" },
      country: { type: String, default: "" },
      companyOrInstitution: { type: String, default: "" },
    },

    status: {
      type: String,
      enum: ["pending", "paid", "expired"],
      default: "pending",
      index: true,
    },

    stripeSessionId: { type: String, unique: true, sparse: true }, // ✅ removed index:true

    // Assigned only on webhook success
    ticketNo: { type: Number, default: null },
    ticketCode: { type: String, default: null, index: true }, // keep only if you search by it
    pdfUrl: { type: String, default: null },

    reservedUntil: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);


OrderSchema.index(
  { "buyer.email": 1 },
  { unique: true, partialFilterExpression: { status: "paid" } }
);

module.exports = mongoose.model("AzadOrder", OrderSchema);