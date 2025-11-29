const { query, execute } = require("../utils/db-helper");

class CalfHealthModel {
  // Get all drone runs for a specific pen
  async getDroneRunsByPen(penNumber) {
    const sql = `
      SELECT 
        dr.run_id,
        dr.drone_id,
        d.drone_number,
        dr.pen_id,
        p.pen_number,
        p.pen_name,
        dr.status,
        dr.scheduled_time,
        dr.start_time,
        dr.end_time,
        dr.duration_minutes,
        dr.concerns_found,
        dr.calves_scanned,
        dr.images_captured,
        dr.created_at
      FROM drone_runs dr
      JOIN drones d ON dr.drone_id = d.id
      JOIN pens p ON dr.pen_id = p.id
      WHERE p.pen_number = @penNumber
      ORDER BY dr.start_time DESC
    `;
    return await query(sql, { penNumber });
  }

  // Get concerns for a specific drone run
  async getConcernsByRunId(runId) {
    const sql = `
      SELECT 
        hc.concern_id,
        c.calf_id,
        c.tag_number,
        c.image_url as calf_image,
        hc.ear_position,
        hc.eye_clarity,
        hc.movement_score,
        hc.dirty_tail,
        hc.dirty_hind_legs,
        hc.snotty_nose,
        hc.is_isolated,
        hc.severity_level,
        hc.severity_score,
        hc.image_url as concern_image,
        hc.ai_notes,
        hc.status,
        hc.detected_at
      FROM health_concerns hc
      JOIN calves c ON hc.calf_id = c.id
      JOIN drone_runs dr ON hc.drone_run_id = dr.id
      WHERE dr.run_id = @runId
      ORDER BY hc.severity_score DESC
    `;
    return await query(sql, { runId });
  }

  // Get all active concerns (not resolved)
  async getActiveConcerns() {
    const sql = `
      SELECT * FROM vw_active_concerns
      ORDER BY severity_score DESC, detected_at DESC
    `;
    return await query(sql);
  }

  // Get calf details by calf_id
  async getCalfById(calfId) {
    const sql = `
      SELECT 
        c.*,
        p.pen_number,
        p.pen_name
      FROM calves c
      JOIN pens p ON c.pen_id = p.id
      WHERE c.calf_id = @calfId
    `;
    const results = await query(sql, { calfId });
    return results[0];
  }

  // Get recent concerns for a specific calf
  async getConcernsByCalfId(calfId) {
    const sql = `
      SELECT 
        hc.*,
        dr.run_id,
        dr.start_time as run_time,
        d.drone_number
      FROM health_concerns hc
      JOIN calves c ON hc.calf_id = c.id
      JOIN drone_runs dr ON hc.drone_run_id = dr.id
      JOIN drones d ON dr.drone_id = d.id
      WHERE c.calf_id = @calfId
      ORDER BY hc.detected_at DESC
    `;
    return await query(sql, { calfId });
  }

  // Get unread notifications
  async getUnreadNotifications() {
    const sql = `
      SELECT 
        n.*,
        c.calf_id,
        c.tag_number,
        p.pen_number
      FROM notifications n
      JOIN calves c ON n.calf_id = c.id
      JOIN pens p ON c.pen_id = p.id
      WHERE n.is_read = 0
      ORDER BY n.sent_at DESC
    `;
    return await query(sql);
  }

  // Mark notification as read
  async markNotificationRead(notificationId) {
    const sql = `
      UPDATE notifications
      SET is_read = 1, read_at = GETDATE()
      WHERE notification_id = @notificationId
    `;
    return await execute(sql, { notificationId });
  }

  // Get dashboard summary
  async getDashboardSummary() {
    const sql = `
      SELECT 
        (SELECT COUNT(*) FROM calves) as total_calves,
        (SELECT COUNT(*) FROM health_concerns WHERE status != 'resolved') as active_concerns,
        (SELECT COUNT(*) FROM health_concerns WHERE severity_level = 'critical' AND status != 'resolved') as critical_concerns,
        (SELECT COUNT(*) FROM drone_runs WHERE CAST(start_time AS DATE) = CAST(GETDATE() AS DATE)) as runs_today,
        (SELECT COUNT(*) FROM notifications WHERE is_read = 0) as unread_notifications
    `;
    const results = await query(sql);
    return results[0];
  }

  // Create a new concern (for simulation/testing)
  async createConcern(concernData) {
    const {
      calfId,
      droneRunId,
      earPosition,
      eyeClarity,
      movementScore,
      dirtyTail,
      dirtyHindLegs,
      snottyNose,
      isIsolated,
      severityLevel,
      severityScore,
      imageUrl,
      aiNotes,
    } = concernData;

    // Generate concern ID
    const concernId = `CONCERN-${Date.now()}`;

    const sql = `
      INSERT INTO health_concerns (
        concern_id, calf_id, drone_run_id,
        ear_position, eye_clarity, movement_score,
        dirty_tail, dirty_hind_legs, snotty_nose, is_isolated,
        severity_level, severity_score, image_url, ai_notes
      )
      OUTPUT INSERTED.*
      VALUES (
        @concernId,
        (SELECT id FROM calves WHERE calf_id = @calfId),
        (SELECT id FROM drone_runs WHERE run_id = @droneRunId),
        @earPosition, @eyeClarity, @movementScore,
        @dirtyTail, @dirtyHindLegs, @snottyNose, @isIsolated,
        @severityLevel, @severityScore, @imageUrl, @aiNotes
      )
    `;

    return await execute(sql, {
      concernId,
      calfId,
      droneRunId,
      earPosition,
      eyeClarity,
      movementScore,
      dirtyTail: dirtyTail ? 1 : 0,
      dirtyHindLegs: dirtyHindLegs ? 1 : 0,
      snottyNose: snottyNose ? 1 : 0,
      isIsolated: isIsolated ? 1 : 0,
      severityLevel,
      severityScore,
      imageUrl,
      aiNotes,
    });
  }

  // Create notification
  async createNotification(notificationData) {
    const { concernId, calfId, droneRunId, title, message, severity } =
      notificationData;
    const notificationId = `NOTIF-${Date.now()}`;

    const sql = `
      INSERT INTO notifications (
        notification_id, concern_id, calf_id, drone_run_id,
        notification_type, title, message, severity
      )
      OUTPUT INSERTED.*
      VALUES (
        @notificationId,
        (SELECT id FROM health_concerns WHERE concern_id = @concernId),
        (SELECT id FROM calves WHERE calf_id = @calfId),
        (SELECT id FROM drone_runs WHERE run_id = @droneRunId),
        'alert', @title, @message, @severity
      )
    `;

    return await execute(sql, {
      notificationId,
      concernId,
      calfId,
      droneRunId,
      title,
      message,
      severity,
    });
  }
}

module.exports = new CalfHealthModel();
