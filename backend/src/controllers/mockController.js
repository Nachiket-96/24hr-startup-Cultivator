const mockData = require("../utils/mockData");
const aiDetectionService = require("../services/aiDetectionService");
const severityService = require("../services/severityService");

// Dashboard
exports.getDashboard = async (req, res) => {
  res.json({
    success: true,
    data: mockData.dashboard,
  });
};

// Pen runs
exports.getDroneRunsForPen = async (req, res) => {
  const { penNumber } = req.params;
  const runs = mockData.penRuns[penNumber] || [];

  res.json({
    success: true,
    data: runs,
  });
};

// Run concerns
exports.getConcernsForRun = async (req, res) => {
  const { runId } = req.params;
  const concerns = mockData.runConcerns[runId] || [];

  res.json({
    success: true,
    data: concerns,
  });
};

// Notifications
exports.getNotifications = async (req, res) => {
  res.json({
    success: true,
    data: mockData.notifications,
    count: mockData.notifications.length,
  });
};

// Calf details
exports.getCalfDetails = async (req, res) => {
  const { calfId } = req.params;
  const calf = mockData.calves[calfId];

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
      recentConcerns: [],
    },
  });
};

// Mark notification read
exports.markNotificationRead = async (req, res) => {
  res.json({
    success: true,
    message: "Notification marked as read (mock)",
  });
};

// Simulate a real drone run with AI processing
exports.simulateDroneRun = async (req, res) => {
  try {
    const { penNumber } = req.body;
    const runId = `RUN-${Date.now()}`;

    console.log(`🚁 Simulating drone run for Pen #${penNumber || 2}`);

    // Simulate AI detection results
    const simulatedDetections = [
      {
        calfId: "CALF-001",
        tagNumber: "TAG-1001",
        imageUrl: "http://localhost:3001/images/calves/1.jpg",
        detections: {
          ear_position: "normal",
          eye_clarity: "clear",
          movement_score: "normal",
          dirty_tail: false,
          dirty_hind_legs: false,
          snotty_nose: false,
          is_isolated: false,
        },
        severity: { score: 0, level: "low", concerns: [] },
      },
      {
        calfId: "CALF-002",
        tagNumber: "TAG-1002",
        imageUrl: "http://localhost:3001/images/calves/2.jpg",
        detections: {
          ear_position: "normal",
          eye_clarity: "clear",
          movement_score: "normal",
          dirty_tail: false,
          dirty_hind_legs: false,
          snotty_nose: false,
          is_isolated: false,
        },
        severity: { score: 0, level: "low", concerns: [] },
      },
      {
        calfId: "CALF-009",
        tagNumber: "TAG-1009",
        imageUrl: "http://localhost:3001/images/calves/3.jpg",
        detections: {
          ear_position: "droopy",
          eye_clarity: "clear",
          movement_score: "normal",
          dirty_tail: true,
          dirty_hind_legs: true,
          snotty_nose: true,
          is_isolated: false,
        },
        severity: {
          score: 85,
          level: "critical",
          concerns: [
            "Droopy ears noted",
            "Dirty tail (possible scours)",
            "Dirty hind legs",
            "Snotty nose (respiratory concern)",
          ],
        },
      },
      {
        calfId: "CALF-012",
        tagNumber: "TAG-2012",
        imageUrl: "http://localhost:3001/images/calves/4.jpg",
        detections: {
          ear_position: "droopy",
          eye_clarity: "dull",
          movement_score: "reduced",
          dirty_tail: false,
          dirty_hind_legs: false,
          snotty_nose: true,
          is_isolated: false,
        },
        severity: {
          score: 75,
          level: "high",
          concerns: [
            "Droopy ears noted",
            "Dull eyes detected",
            "Reduced movement observed",
            "Snotty nose (respiratory concern)",
          ],
        },
      },
      {
        calfId: "CALF-015",
        tagNumber: "TAG-2015",
        imageUrl: "http://localhost:3001/images/calves/5.jpg",
        detections: {
          ear_position: "normal",
          eye_clarity: "clear",
          movement_score: "normal",
          dirty_tail: false,
          dirty_hind_legs: false,
          snotty_nose: false,
          is_isolated: false,
        },
        severity: { score: 0, level: "low", concerns: [] },
      },
    ];

    // Count concerns
    const concernsFound = simulatedDetections.filter(
      (d) => d.severity.score > 0
    ).length;
    const criticalConcerns = simulatedDetections.filter(
      (d) => d.severity.level === "critical"
    ).length;
    const highConcerns = simulatedDetections.filter(
      (d) => d.severity.level === "high"
    ).length;

    // Generate notifications for high/critical
    const notifications = simulatedDetections
      .filter(
        (d) => d.severity.level === "critical" || d.severity.level === "high"
      )
      .map((d) => ({
        notificationId: `NOTIF-${Date.now()}-${d.calfId}`,
        title: `${
          d.severity.level === "critical" ? "URGENT" : "Important"
        }: Calf #${d.calfId.split("-")[1]}`,
        message: `Calf #${d.calfId.split("-")[1]} in Pen #${
          penNumber || 2
        } requires ${
          d.severity.level === "critical" ? "immediate" : "prompt"
        } attention. Issues: ${d.severity.concerns.join(", ")}.`,
        severity: d.severity.level,
        calfId: d.calfId,
        tagNumber: d.tagNumber,
        penNumber: penNumber || 2,
        timestamp: new Date().toISOString(),
      }));

    console.log(`✅ Drone run ${runId} completed`);
    console.log(`   - Calves scanned: ${simulatedDetections.length}`);
    console.log(`   - Concerns found: ${concernsFound}`);
    console.log(`   - Critical: ${criticalConcerns}, High: ${highConcerns}`);
    console.log(`   - Notifications sent: ${notifications.length}`);

    res.json({
      success: true,
      message: "Drone run simulation completed",
      data: {
        runId: runId,
        status: "completed",
        penNumber: penNumber || 2,
        droneNumber: 178,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 14 * 60000).toISOString(),
        durationMinutes: 14,
        calvesScanned: simulatedDetections.length,
        imagesCaptured: simulatedDetections.length * 3,
        concernsFound: concernsFound,
        criticalConcerns: criticalConcerns,
        highConcerns: highConcerns,
        mediumConcerns: simulatedDetections.filter(
          (d) => d.severity.level === "medium"
        ).length,
        lowConcerns: simulatedDetections.filter(
          (d) => d.severity.level === "low"
        ).length,
        notificationsSent: notifications.length,

        // Detailed results for each calf
        detections: simulatedDetections.map((d) => ({
          calfId: d.calfId,
          calfIdNumber: parseInt(d.calfId.split("-")[1]),
          tagNumber: d.tagNumber,
          imageUrl: d.imageUrl,
          earPosition: d.detections.ear_position,
          eyeClarity: d.detections.eye_clarity,
          movementScore: d.detections.movement_score,
          dirtyTail: d.detections.dirty_tail,
          dirtyHindLegs: d.detections.dirty_hind_legs,
          snottyNose: d.detections.snotty_nose,
          isIsolated: d.detections.is_isolated,
          severityScore: d.severity.score,
          severityLevel: d.severity.level,
          concerns: d.severity.concerns,
          aiConfidence: 0.92,
        })),

        // Notifications that were sent
        notifications: notifications,

        // Summary statistics
        summary: {
          healthy: simulatedDetections.filter((d) => d.severity.score === 0)
            .length,
          withConcerns: concernsFound,
          requiresImmediateAttention: criticalConcerns,
          requiresAttentionToday: highConcerns,
          monitorClosely: simulatedDetections.filter(
            (d) => d.severity.level === "medium"
          ).length,
        },
      },
    });
  } catch (err) {
    console.error("Error in simulate drone run:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Check AI Service Status
exports.checkAIService = async (req, res) => {
  try {
    const health = await aiDetectionService.checkAIServiceHealth();
    const stats = aiDetectionService.getStats();

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      aiService: {
        url: health.url,
        available: health.available,
        status: health.status || null,
        error: health.error || null,
      },
      configuration: {
        mode: stats.mode,
        usingSimulation: stats.usingSimulation,
        serviceUrl: stats.serviceUrl,
      },
      message: health.available
        ? "AI service is online and ready"
        : "AI service unavailable - using simulation mode",
    });
  } catch (err) {
    console.error("Error checking AI service:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Export all data as JSON (for frontend team)
exports.exportAllData = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Complete mock data export for frontend development",
      data: {
        dashboard: mockData.dashboard,
        penRuns: mockData.penRuns,
        runConcerns: mockData.runConcerns,
        notifications: mockData.notifications,
        calves: mockData.calves,
      },
      documentation: {
        description:
          "This endpoint provides all mock data for frontend development",
        usage:
          "Use this data to build and test UI components without backend dependencies",
        endpoints: {
          dashboard: "GET /api/calf-health/dashboard",
          penRuns: "GET /api/calf-health/pens/:penNumber/runs",
          concerns: "GET /api/calf-health/runs/:runId/concerns",
          notifications: "GET /api/calf-health/notifications",
          simulate: "POST /api/calf-health/simulate-run",
        },
      },
    });
  } catch (err) {
    console.error("Error exporting data:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Export mock UI data
exports.exportMockUIData = async (req, res) => {
  try {
    const mockUIData = {
      // Screen 1: Pen Runs List
      screen1_penRuns: {
        penNumber: 2,
        penName: "Pen South",
        runs: [
          {
            runId: "RUN-001",
            droneNumber: 178,
            status: "completed",
            completedAt: "12pm",
            concernsFound: 4,
            tapToView: true,
            statusColor: "#22C55E",
          },
          {
            runId: "RUN-002",
            droneNumber: 178,
            status: "completed",
            completedAt: "4pm",
            concernsFound: 0,
            tapToView: true,
            statusColor: "#22C55E",
          },
          {
            runId: "RUN-003",
            droneNumber: 178,
            status: "completed",
            completedAt: "8pm",
            concernsFound: 17,
            tapToView: true,
            statusColor: "#22C55E",
          },
          {
            runId: "RUN-004",
            droneNumber: 178,
            status: "pending",
            scheduledAt: "12am",
            concernsFound: 4,
            tapToView: false,
            statusColor: "#9CA3AF",
          },
        ],
      },

      // Screen 2: Concern Details
      screen2_concerns: {
        penNumber: 2,
        runNumber: 1,
        runTime: "12pm",
        concerns: [
          {
            calfId: 12,
            calfIdNumber: 12,
            imageUrl: "http://localhost:3001/images/calves/1.jpg",
            severityLevel: "high",
            severityIndicatorColor: "#EA580C",
            concerns: ["Droopy ears noted", "Snotty nose"],
          },
          {
            calfId: 9,
            calfIdNumber: 9,
            imageUrl: "http://localhost:3001/images/calves/2.jpg",
            severityLevel: "critical",
            severityIndicatorColor: "#DC2626",
            concerns: ["Droopy ears noted", "Snotty nose", "Dirty Tail"],
          },
        ],
      },

      // Notification Format
      notificationFormat: {
        title: "Health Alert",
        body: "Calf ID #9 in Pen #2 requires attention",
        data: {
          calfId: 9,
          penNumber: 2,
          droneNumber: 178,
          runTime: "12pm",
          concerns: ["Droopy ears noted", "Snotty nose", "Dirty tail"],
          severity: "critical",
        },
      },

      // Color scheme
      colorScheme: {
        severity: {
          critical: "#DC2626",
          high: "#EA580C",
          medium: "#F59E0B",
          low: "#10B981",
        },
        status: {
          completed: "#22C55E",
          in_progress: "#3B82F6",
          pending: "#9CA3AF",
          failed: "#EF4444",
        },
      },
    };

    res.json({
      success: true,
      message: "Mock UI data for frontend development",
      data: mockUIData,
    });
  } catch (err) {
    console.error("Error exporting mock UI data:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
