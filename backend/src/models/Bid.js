const mongoose = require("mongoose");
const { z } = require("zod");

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
});

const BidSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: [ItemSchema],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invitedBidders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BidValidationSchema = z.object({
  title: z.string().nonempty(),
  items: z.array(
    z.object({
      description: z.string().nonempty(),
      amount: z.number().nonnegative(),
    })
  ),
  startTime: z.date(),
  endTime: z.date().refine((date) => date > new Date(), {
    message: "End time must be in the future",
  }),
  participants: z.array(z.string()),
});

module.exports = {
  Bid: mongoose.model("Bid", BidSchema),
  BidValidationSchema,
};
