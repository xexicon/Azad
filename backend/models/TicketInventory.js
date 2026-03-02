const mongoose = require("mongoose");

const TicketInventorySchema = new mongoose.Schema(
  {
    _id: { type: String, default: "TICKETS" }, // fixed single doc id
    total: { type: Number, default: 100 },
    remaining: { type: Number, default: 100 }, // capacity reserved at checkout create
    nextTicketNo: { type: Number, default: 1 }, // assigned only after payment success
  },
  { timestamps: true }
);

module.exports = mongoose.model("TicketInventory", TicketInventorySchema);