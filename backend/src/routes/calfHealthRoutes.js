const express = require("express");
const router = express.Router();

// Use mock controller for demo
const controller = require("../controllers/mockController");

// All routes
router.get("/dashboard", controller.getDashboard);
router.get("/pens/:penNumber/runs", controller.getDroneRunsForPen);
router.get("/runs/:runId/concerns", controller.getConcernsForRun);
router.get("/notifications", controller.getNotifications);
router.get("/calves/:calfId", controller.getCalfDetails);
router.put(
  "/notifications/:notificationId/read",
  controller.markNotificationRead
);

// Simulate drone run - THIS MUST BE POST
router.post("/simulate-run", controller.simulateDroneRun);

module.exports = router;
