import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { User } from "./User.js";

const app = express();

// Create an HTTP server from the Express app.
const server = http.createServer(app);

// Create the WebSocket server and specify a path.
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  const user = new User(ws);
  user.initHandlers();

  ws.on("close", () => {
    user.destroy();
  });
});

// Example Express route for HTTP requests.
app.get("/", (req, res) => {
  res.send("Hello from the combined HTTP and WebSocket server!");
});

// Start the server.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
