const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ error: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
