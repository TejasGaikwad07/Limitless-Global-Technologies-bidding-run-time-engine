const express = require("express");
const { Bid } = require("../models/Bid");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.put("/:id/accept", authMiddleware(["Bidder"]), async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ error: "Bid not found" });

    if (!bid.participants.includes(req.user.id)) {
      bid.participants.push(req.user.id);
      await bid.save();
    }

    res.json(bid);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id/reject", authMiddleware(["Bidder"]), async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ error: "Bid not found" });

    bid.participants = bid.participants.filter(
      (p) => p.toString() !== req.user.id
    );
    await bid.save();

    res.json(bid);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id/bid", authMiddleware(["Bidder"]), async (req, res) => {
  const { itemId, amount } = req.body;
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ error: "Bid not found" });

    if (!bid.participants.includes(req.user.id)) {
      return res
        .status(403)
        .json({ error: "You are not a participant in this bid" });
    }

    const item = bid.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.amount = amount;
    await bid.save();

    res.json(bid);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
