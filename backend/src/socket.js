const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const { Bid } = require("./models/Bid");

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const token = new URL(
      req.url,
      `http://${req.headers.host}`
    ).searchParams.get("token");
    if (!token) return ws.close(1008, "No token provided");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      ws.user = decoded;
      console.log(`User connected: ${ws.user.id}`);
    } catch (err) {
      return ws.close(1008, "Invalid token");
    }

    ws.on("message", async (message) => {
      const parsedMessage = JSON.parse(message);

      switch (parsedMessage.type) {
        case "BID_UPDATE":
          const { bidId, itemId, amount } = parsedMessage;
          const bid = await Bid.findById(bidId);
          const item = bid.items.id(itemId);
          item.amount = amount;
          await bid.save();

          wss.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              client.user.id !== ws.user.id
            ) {
              client.send(
                JSON.stringify({
                  type: "LEADERBOARD_UPDATE",
                  bidId,
                  itemId,
                  amount,
                })
              );
            }
          });
          break;

        case "BID_INVITATION":
          const { invitedUserIds } = parsedMessage;
          invitedUserIds.forEach((userId) => {
            wss.clients.forEach((client) => {
              if (
                client.readyState === WebSocket.OPEN &&
                client.user.id === userId
              ) {
                client.send(JSON.stringify({ type: "NEW_INVITATION", bidId }));
              }
            });
          });
          break;

        default:
          console.log("Unknown message type:", parsedMessage.type);
      }
    });

    ws.on("close", () => {
      console.log(`User disconnected: ${ws.user.id}`);
    });
  });

  console.log("WebSocket server started");
};

module.exports = setupWebSocket;
