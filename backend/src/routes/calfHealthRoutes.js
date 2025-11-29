const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const controller = require("../controllers/mockController");

// Dashboard
router.get("/dashboard", controller.getDashboard);

// Pen runs for a specific pen
router.get("/pens/:penNumber/runs", controller.getDroneRunsForPen);

// Concerns for a specific drone run
router.get("/runs/:runId/concerns", controller.getConcernsForRun);

// Notifications
router.get("/notifications", controller.getNotifications);
=======

// Use mock controller for demo
const controller = require("../controllers/mockController");

// All routes
router.get("/dashboard", controller.getDashboard);
router.get("/pens/:penNumber/runs", controller.getDroneRunsForPen);
router.get("/runs/:runId/concerns", controller.getConcernsForRun);
router.get("/notifications", controller.getNotifications);
router.get("/calves/:calfId", controller.getCalfDetails);
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
router.put(
  "/notifications/:notificationId/read",
  controller.markNotificationRead
);

<<<<<<< HEAD
// Calf details
router.get("/calves/:calfId", controller.getCalfDetails);

// Simulate drone run
router.post("/simulate-run", controller.simulateDroneRun);

// AI Service Status
router.get("/ai-service-status", controller.checkAIService);

// Export endpoints
router.get("/export/all", controller.exportAllData);
router.get("/export/mock-ui", controller.exportMockUIData);

=======
// Simulate drone run - THIS MUST BE POST
router.post("/simulate-run", controller.simulateDroneRun);

>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
module.exports = router;
