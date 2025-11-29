const CalfHealthModel = require("../models/CalfHealthModel");
const mockData = require("../utils/mockData"); // Add this line

// Add USE_MOCK flag
const USE_MOCK = process.env.USE_MOCK === "true";

// Get drone runs for pen (for UI Screen 1)
exports.getDroneRunsForPen = async (req, res) => {
  try {
    const { penNumber } = req.params;

    // Use mock data if database fails or USE_MOCK is true
    if (USE_MOCK) {
      const runs = mockData.penRuns[penNumber] || [];
      return res.json({
        success: true,
        data: runs,
        source: "mock",
      });
    }

    // Try database first
    try {
      const runs = await CalfHealthModel.getDroneRunsByPen(penNumber);
      const formattedRuns = runs.map((run) => ({
        runId: run.run_id,
        droneNumber: run.drone_number,
        penNumber: run.pen_number,
        status: run.status,
        completedAt: run.start_time,
        concernsFound: run.concerns_found,
        calvesScanned: run.calves_scanned,
      }));

      res.json({
        success: true,
        data: formattedRuns,
        source: "database",
      });
    } catch (dbError) {
      console.warn("Database failed, using mock data:", dbError.message);
      const runs = mockData.penRuns[penNumber] || [];
      res.json({
        success: true,
        data: runs,
        source: "mock-fallback",
      });
    }
  } catch (err) {
    console.error("Error getting drone runs:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get concerns for a drone run (for UI Screen 2)
exports.getConcernsForRun = async (req, res) => {
  try {
    const { runId } = req.params;
    const concerns = await CalfHealthModel.getConcernsByRunId(runId);

    // Transform to match UI format
    const formattedConcerns = concerns.map((concern) => {
      // Build concerns list
      const concernsList = [];
      if (
        concern.ear_position === "droopy" ||
        concern.ear_position === "down"
      ) {
        concernsList.push("Droopy ears noted");
      }
      if (
        concern.eye_clarity === "dull" ||
        concern.eye_clarity === "discharge"
      ) {
        concernsList.push("Eye issues detected");
      }
      if (concern.snotty_nose) {
        concernsList.push("Snotty nose");
      }
      if (concern.dirty_tail) {
        concernsList.push("Dirty tail");
      }
      if (concern.dirty_hind_legs) {
        concernsList.push("Dirty hind legs");
      }
      if (concern.movement_score === "reduced") {
        concernsList.push("Reduced movement");
      }
      if (concern.movement_score === "zero") {
        concernsList.push("No movement");
      }
      if (concern.is_isolated) {
        concernsList.push("Isolated from herd");
      }

      return {
        calfId: concern.calf_id,
        calfIdNumber: parseInt(concern.calf_id.split("-")[1]), // Extract number from CALF-001
        tagNumber: concern.tag_number,
        imageUrl: concern.calf_image,
        concerns: concernsList,
        severityLevel: concern.severity_level,
        severityScore: concern.severity_score,
        detectedAt: concern.detected_at,
      };
    });

    res.json({
      success: true,
      data: formattedConcerns,
    });
  } catch (err) {
    console.error("Error getting concerns:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get dashboard summary
exports.getDashboard = async (req, res) => {
  try {
    const summary = await CalfHealthModel.getDashboardSummary();
    const activeConcerns = await CalfHealthModel.getActiveConcerns();

    res.json({
      success: true,
      data: {
        summary,
        recentConcerns: activeConcerns.slice(0, 10), // Top 10 most severe
      },
    });
  } catch (err) {
    console.error("Error getting dashboard:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await CalfHealthModel.getUnreadNotifications();

    res.json({
      success: true,
      data: notifications,
      count: notifications.length,
    });
  } catch (err) {
    console.error("Error getting notifications:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await CalfHealthModel.markNotificationRead(notificationId);

    res.json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (err) {
    console.error("Error marking notification:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Simulate drone run (for demo)
exports.simulateDroneRun = async (req, res) => {
  try {
    const { penNumber } = req.body;

    // This would normally trigger the drone and AI
    // For demo, we'll just return success
    res.json({
      success: true,
      message: `Drone run initiated for Pen #${penNumber}`,
      runId: `RUN-${Date.now()}`,
    });
  } catch (err) {
    console.error("Error simulating drone run:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get calf details
exports.getCalfDetails = async (req, res) => {
  try {
    const { calfId } = req.params;
    const calf = await CalfHealthModel.getCalfById(calfId);
    const concerns = await CalfHealthModel.getConcernsByCalfId(calfId);

    if (!calf) {
      return res.status(404).json({
        success: false,
        error: "Calf not found",
      });
    }

    res.json({
      success: true,
      data: {
        calf,
        recentConcerns: concerns,
      },
    });
  } catch (err) {
    console.error("Error getting calf details:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
