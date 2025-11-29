const aiDetectionService = require("./aiDetectionService");
const severityService = require("./severityService");
const { query, execute } = require("../utils/db-helper");

class DroneRunService {
  /**
   * Process a complete drone run
   * This is the main orchestrator
   */
  async processDroneRun(droneRunData) {
    const { droneId, penNumber, scheduledTime, images } = droneRunData;

    try {
      // 1. Create drone run record
      const runId = `RUN-${Date.now()}`;
      const droneRun = await this.createDroneRun(
        runId,
        droneId,
        penNumber,
        scheduledTime
      );

      console.log(`✅ Drone run ${runId} started for Pen #${penNumber}`);

      // 2. Process each image with AI
      const detectionResults = await aiDetectionService.analyzeDroneRun(
        runId,
        images
      );

      console.log(`🔍 Analyzed ${detectionResults.length} calves`);

      let concernsFound = 0;
      const notifications = [];

      // 3. For each detection, calculate severity and store
      for (const detection of detectionResults) {
        const severity = severityService.calculateSeverity(
          detection.detections
        );

        // Only store if there's a concern (score > 0)
        if (severity.score > 0) {
          concernsFound++;

          // Store concern in database
          const concern = await this.storeConcern({
            runId: runId,
            calfId: detection.calfId,
            detections: detection.detections,
            severity: severity,
            imagePath: detection.imagePath,
          });

          console.log(
            `⚠️  Concern detected: Calf ${detection.calfId} - ${severity.level} (${severity.score})`
          );

          // 4. Send notification if needed
          if (severityService.shouldNotify(severity.level)) {
            const notification = await this.createNotification({
              concernId: concern.concern_id,
              calfId: detection.calfId,
              runId: runId,
              severity: severity,
              penNumber: penNumber,
            });

            notifications.push(notification);
            console.log(`📢 Notification sent for Calf ${detection.calfId}`);
          }
        }
      }

      // 5. Update drone run with results
      await this.completeDroneRun(runId, {
        concernsFound: concernsFound,
        calvesScanned: images.length,
        imagesCaptured: images.length,
      });

      console.log(
        `✅ Drone run ${runId} completed. Found ${concernsFound} concerns.`
      );

      return {
        runId: runId,
        status: "completed",
        concernsFound: concernsFound,
        calvesScanned: images.length,
        notificationsSent: notifications.length,
      };
    } catch (error) {
      console.error("❌ Error processing drone run:", error);
      throw error;
    }
  }

  /**
   * Create drone run record in database
   */
  async createDroneRun(runId, droneId, penNumber, scheduledTime) {
    const sql = `
      INSERT INTO drone_runs (
        run_id, drone_id, pen_id, status, scheduled_time, start_time
      )
      OUTPUT INSERTED.*
      VALUES (
        @runId,
        (SELECT id FROM drones WHERE drone_number = @droneId),
        (SELECT id FROM pens WHERE pen_number = @penNumber),
        'in_progress',
        @scheduledTime,
        GETDATE()
      )
    `;

    return await execute(sql, { runId, droneId, penNumber, scheduledTime });
  }

  /**
   * Store health concern in database
   */
  async storeConcern(concernData) {
    const { runId, calfId, detections, severity, imagePath } = concernData;
    const concernId = `CONCERN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const sql = `
      INSERT INTO health_concerns (
        concern_id, calf_id, drone_run_id,
        ear_position, eye_clarity, movement_score,
        dirty_tail, dirty_hind_legs, snotty_nose, is_isolated,
        severity_level, severity_score, image_url, ai_notes, status
      )
      OUTPUT INSERTED.*
      VALUES (
        @concernId,
        (SELECT id FROM calves WHERE calf_id = @calfId),
        (SELECT id FROM drone_runs WHERE run_id = @runId),
        @earPosition, @eyeClarity, @movementScore,
        @dirtyTail, @dirtyHindLegs, @snottyNose, @isIsolated,
        @severityLevel, @severityScore, @imageUrl, @aiNotes, 'new'
      )
    `;

    return await execute(sql, {
      concernId,
      calfId,
      runId,
      earPosition: detections.ear_position,
      eyeClarity: detections.eye_clarity,
      movementScore: detections.movement_score,
      dirtyTail: detections.dirty_tail ? 1 : 0,
      dirtyHindLegs: detections.dirty_hind_legs ? 1 : 0,
      snottyNose: detections.snotty_nose ? 1 : 0,
      isIsolated: detections.is_isolated ? 1 : 0,
      severityLevel: severity.level,
      severityScore: severity.score,
      imageUrl: imagePath,
      aiNotes: severity.aiNotes,
    });
  }

  /**
   * Create notification
   */
  async createNotification(notificationData) {
    const { concernId, calfId, runId, severity, penNumber } = notificationData;
    const notificationId = `NOTIF-${Date.now()}`;

    const message = severityService.generateNotificationMessage(
      calfId,
      penNumber,
      severity.concerns,
      severity.level
    );

    const sql = `
      INSERT INTO notifications (
        notification_id, concern_id, calf_id, drone_run_id,
        notification_type, title, message, severity, notification_sent
      )
      OUTPUT INSERTED.*
      VALUES (
        @notificationId,
        (SELECT id FROM health_concerns WHERE concern_id = @concernId),
        (SELECT id FROM calves WHERE calf_id = @calfId),
        (SELECT id FROM drone_runs WHERE run_id = @runId),
        'alert', @title, @message, @severity, 1
      )
    `;

    return await execute(sql, {
      notificationId,
      concernId,
      calfId,
      runId,
      title: message.title,
      message: message.message,
      severity: message.severity,
    });
  }

  /**
   * Complete drone run
   */
  async completeDroneRun(runId, results) {
    const sql = `
      UPDATE drone_runs
      SET 
        status = 'completed',
        end_time = GETDATE(),
        duration_minutes = DATEDIFF(MINUTE, start_time, GETDATE()),
        concerns_found = @concernsFound,
        calves_scanned = @calvesScanned,
        images_captured = @imagesCaptured
      WHERE run_id = @runId
    `;

    return await execute(sql, {
      runId,
      concernsFound: results.concernsFound,
      calvesScanned: results.calvesScanned,
      imagesCaptured: results.imagesCaptured,
    });
  }
}

module.exports = new DroneRunService();
