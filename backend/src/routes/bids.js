const express = require("express");
const { Bid, BidValidationSchema } = require("../models/Bid");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware(["Bid Creator"]), async (req, res) => {
  try {
    const validatedData = BidValidationSchema.parse(req.body);
    const newBid = new Bid({
      ...validatedData,
      createdBy: req.user.id,
    });
    const bid = await newBid.save();
    res.json(bid);
  } catch (err) {
    const errorMessage = err.errors ? err.errors : "Server Error";
    res.status(400).json({ error: errorMessage });
  }
});

router.put(
  "/:id/publish",
  authMiddleware(["Bid Creator"]),
  async (req, res) => {
    try {
      const bid = await Bid.findById(req.params.id);
      if (!bid) return res.status(404).json({ error: "Bid not found" });

      if (bid.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      bid.published = true;
      await bid.save();

      res.json(bid);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.get(
  "/:id/leaderboard",
  authMiddleware(["Bid Creator"]),
  async (req, res) => {
    try {
      const bid = await Bid.findById(req.params.id).populate("participants");
      if (!bid) return res.status(404).json({ error: "Bid not found" });

      const leaderboard = {};
      res.json(leaderboard);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.get(
  "/:id/summary",
  authMiddleware(["Bid Creator"]),
  async (req, res) => {
    try {
      const bid = await Bid.findById(req.params.id).populate("participants");
      if (!bid) return res.status(404).json({ error: "Bid not found" });

      const summary = {};
      res.json(summary);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.post("/invite", authMiddleware(["Bid Creator"]), async (req, res) => {
  const { bidId, bidderEmails } = req.body;

  try {
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const bidders = await User.find({ email: { $in: bidderEmails } });
    const bidderIds = bidders.map((bidder) => bidder._id);

    bid.invitedBidders.push(...bidderIds);
    await bid.save();

    res
      .status(200)
      .json({
        message: "Bidders invited successfully",
        invitedBidders: bidderIds,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
