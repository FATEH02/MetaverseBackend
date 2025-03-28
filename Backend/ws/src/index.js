import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app); // HTTP Server
const wss = new WebSocketServer({ noServer: true }); // WebSocket Server (No Direct Port)

// WebSocket Upgrade Handling
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send("Echo: " + message);
  });

  ws.on("close", () => {
    console.log("WebSocket disconnected");
  });
});

// Example Express Route (For HTTP Requests)
app.get("/", (req, res) => {
  res.send("Express + WebSocket Server Running!");
});

// Start the Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
