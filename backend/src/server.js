const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images (for calf photos, etc.)
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Optional: serve test static files (if you want to quickly preview public assets)
app.use("/test", express.static(path.join(__dirname, "../public")));

// Log all requests (helpful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// =====================
// Health check endpoint
// =====================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// =====================
// Routes
// =====================

// Items routes (if you’re using them for DB testing)
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

// Calf health routes (main API)
const calfHealthRoutes = require("./routes/calfHealthRoutes");
app.use("/api/calf-health", calfHealthRoutes);

// =====================
// API info endpoint
// =====================
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "24HR Startup - Calf Health Monitoring API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      dashboard: "/api/calf-health/dashboard",
      penRuns: "/api/calf-health/pens/:penNumber/runs",
      runConcerns: "/api/calf-health/runs/:runId/concerns",
      notifications: "/api/calf-health/notifications",
      calfDetails: "/api/calf-health/calves/:calfId",
      simulateRun: "POST /api/calf-health/simulate-run",
      aiStatus: "/api/calf-health/ai-service-status",
      exportAll: "/api/calf-health/export/all",
      exportMock: "/api/calf-health/export/mock-ui",
    },
  });
});

// =====================
// 404 handler
// =====================
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// =====================
// Error handler
// =====================
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

// =====================
// Start server
// =====================
app.listen(PORT, () => {
  console.log("\n==================================================");
  console.log("🚀 24 HOUR STARTUP - BACKEND SERVER");
  console.log("==================================================");
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`⚡ API: http://localhost:${PORT}/api`);
  console.log(`👨‍💻 Developer: ${process.env.DEVELOPER_1}`);
  console.log("==================================================\n");
});
