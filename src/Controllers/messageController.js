// Import required modules
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Initialize Express application
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket event listener
wss.on('connection', (ws) => {
    console.log('Client connected');

    // WebSocket message listener
    ws.on('message', (message) => {
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // WebSocket close listener
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});



