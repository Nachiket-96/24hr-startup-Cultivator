// Severity Scoring Engine
// Calculates how sick a calf is based on AI detections

class SeverityService {
  /**
   * Calculate severity score from AI detections
   * @param {Object} detections - AI detection results
   * @returns {Object} { score: 0-100, level: 'low|medium|high|critical', notes: string }
   */
  calculateSeverity(detections) {
    let score = 0;
    const concerns = [];

    // Ear position (0-25 points)
    if (detections.ear_position === "droopy") {
      score += 15;
      concerns.push("Droopy ears noted");
    } else if (detections.ear_position === "down") {
      score += 25;
      concerns.push("Ears completely down");
    }

    // Eye clarity (0-20 points)
    if (detections.eye_clarity === "dull") {
      score += 15;
      concerns.push("Dull eyes detected");
    } else if (detections.eye_clarity === "discharge") {
      score += 20;
      concerns.push("Eye discharge present");
    }

    // Movement (0-30 points) - CRITICAL INDICATOR
    if (detections.movement_score === "reduced") {
      score += 20;
      concerns.push("Reduced movement observed");
    } else if (detections.movement_score === "zero") {
      score += 30;
      concerns.push("No movement - CRITICAL");
    }

    // Dirty tail (0-10 points) - Sign of diarrhea
    if (detections.dirty_tail) {
      score += 10;
      concerns.push("Dirty tail (possible scours)");
    }

    // Dirty hind legs (0-10 points)
    if (detections.dirty_hind_legs) {
      score += 10;
      concerns.push("Dirty hind legs");
    }

    // Snotty nose (0-15 points) - Respiratory issue
    if (detections.snotty_nose) {
      score += 15;
      concerns.push("Snotty nose (respiratory concern)");
    }

    // Isolation (0-15 points) - Behavioral indicator
    if (detections.is_isolated) {
      score += 15;
      concerns.push("Isolated from herd");
    }

    // Determine severity level
    const level = this.getSeverityLevel(score);

    return {
      score: Math.min(score, 100), // Cap at 100
      level,
      concerns,
      aiNotes: concerns.join(", "),
    };
  }

  /**
   * Convert numeric score to severity level
   */
  getSeverityLevel(score) {
    if (score >= 70) return "critical"; // Immediate attention needed
    if (score >= 50) return "high";     // Check today
    if (score >= 30) return "medium";   // Monitor closely
    return "low";                       // Normal monitoring
  }

  /**
   * Determine if notification should be sent
   */
  shouldNotify(severityLevel) {
    return severityLevel === "critical" || severityLevel === "high";
  }

  /**
   * Generate notification message
   */
  generateNotificationMessage(calfId, penNumber, concerns, severityLevel) {
    const urgency = severityLevel === "critical" ? "URGENT" : "Important";

    return {
      title: `${urgency}: Calf #${calfId}`,
      message: `Calf #${calfId} in Pen #${penNumber} requires ${
        severityLevel === "critical" ? "immediate" : "prompt"
      } attention. Issues: ${concerns.join(", ")}.`,
      severity: severityLevel,
    };
  }
}

module.exports = new SeverityService();
