const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT: Serve static images
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use('/test', express.static(path.join(__dirname, '../public')));

// ... rest of your server code

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

const calfHealthRoutes = require("./routes/calfHealthRoutes");
app.use("/api/calf-health", calfHealthRoutes);

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "24HR Startup - Calf Health Monitoring API",
    endpoints: {
      health: "/health",
      dashboard: "/api/calf-health/dashboard",
      penRuns: "/api/calf-health/pens/:penNumber/runs",
      runConcerns: "/api/calf-health/runs/:runId/concerns",
      notifications: "/api/calf-health/notifications",
      calfDetails: "/api/calf-health/calves/:calfId",
      simulateRun: "POST /api/calf-health/simulate-run",
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
