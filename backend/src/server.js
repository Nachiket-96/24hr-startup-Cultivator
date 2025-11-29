const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests (helpful for 24hr hackathon debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "24HR Startup API is running!",
    timestamp: new Date().toISOString(),
    developer: process.env.DEVELOPER_1,
  });
});

// Import routes
const itemRoutes = require("./routes/itemRoutes");

// Use routes
app.use("/api/items", itemRoutes);

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API endpoint - ready for your routes!",
    endpoints: {
      health: "/health",
      items: "/api/items",
      item: "/api/items/:id",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("🚀 24 HOUR STARTUP - BACKEND SERVER");
  console.log("=".repeat(50));
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`⚡ API: http://localhost:${PORT}/api`);
  console.log(`👨‍💻 Developer: ${process.env.DEVELOPER_1}`);
  console.log("=".repeat(50));
});

module.exports = app;
