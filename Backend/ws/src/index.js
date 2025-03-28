import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { User } from "./User.js";

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Attach WebSocket server to the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  const user = new User(ws);
  user.initHandlers();

  ws.on("close", () => {
    user.destroy();
  });
});

// Example Express route
app.get("/", (req, res) => {
  res.send("Hello from the combined HTTP & WebSocket server!");
});

// Use Render's assigned PORT (not manually set to 3000)
const PORT =  4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
