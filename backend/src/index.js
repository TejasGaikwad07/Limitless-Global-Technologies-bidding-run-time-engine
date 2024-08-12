const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();
const setupWebSocket = require("./socket");
const authRoutes = require("./routes/auth");
const bidRoutes = require("./routes/bids");
const bidderRoutes = require("./routes/bidder");
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/bidder", bidderRoutes);

app.use(errorHandler);

const server = require("http").createServer(app);

setupWebSocket(server);

server.listen(8080, () => {
  console.log(`Server started on port ${8080}`);
});
