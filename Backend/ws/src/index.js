import { User } from "./User.js";
import { WebSocketServer } from "ws";
import express from "express";
import http from "http";

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Attach WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
    console.log("Client connected to WebSocket");

    const user = new User(ws);
    user.initHandlers();

    ws.on("close", () => {
        user.destroy();
    });
});

// Example API Route
app.get("/", (req, res) => {
    res.send("Hello from Express API & WebSocket!");
});

// Start the combined server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
