const express = require("express");
const router = express.Router();
const controller = require("../controllers/mockController");

// Dashboard
router.get("/dashboard", controller.getDashboard);

// Pen runs for a specific pen
router.get("/pens/:penNumber/runs", controller.getDroneRunsForPen);

// Concerns for a specific drone run
router.get("/runs/:runId/concerns", controller.getConcernsForRun);

// Notifications
router.get("/notifications", controller.getNotifications);
router.put(
  "/notifications/:notificationId/read",
  controller.markNotificationRead
);

// Calf details
router.get("/calves/:calfId", controller.getCalfDetails);

// Simulate drone run
router.post("/simulate-run", controller.simulateDroneRun);

// AI Service Status
router.get("/ai-service-status", controller.checkAIService);

// Export endpoints
router.get("/export/all", controller.exportAllData);
router.get("/export/mock-ui", controller.exportMockUIData);

module.exports = router;
