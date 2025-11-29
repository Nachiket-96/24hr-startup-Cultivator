<<<<<<< HEAD
class SeverityService {
=======
// Severity Scoring Engine
// Calculates how sick a calf is based on AI detections

class SeverityService {
  /**
   * Calculate severity score from AI detections
   * @param {Object} detections - AI detection results
   * @returns {Object} { score: 0-100, level: 'low|medium|high|critical', notes: string }
   */
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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

<<<<<<< HEAD
    // Dirty tail (0-10 points)
=======
    // Dirty tail (0-10 points) - Sign of diarrhea
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
    if (detections.dirty_tail) {
      score += 10;
      concerns.push("Dirty tail (possible scours)");
    }

    // Dirty hind legs (0-10 points)
    if (detections.dirty_hind_legs) {
      score += 10;
      concerns.push("Dirty hind legs");
    }

<<<<<<< HEAD
    // Snotty nose (0-15 points)
=======
    // Snotty nose (0-15 points) - Respiratory issue
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
    if (detections.snotty_nose) {
      score += 15;
      concerns.push("Snotty nose (respiratory concern)");
    }

<<<<<<< HEAD
    // Isolation (0-15 points)
=======
    // Isolation (0-15 points) - Behavioral indicator
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
    if (detections.is_isolated) {
      score += 15;
      concerns.push("Isolated from herd");
    }

<<<<<<< HEAD
    const level = this.getSeverityLevel(score);

    return {
      score: Math.min(score, 100),
=======
    // Determine severity level
    const level = this.getSeverityLevel(score);

    return {
      score: Math.min(score, 100), // Cap at 100
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
      level: level,
      concerns: concerns,
      aiNotes: concerns.join(", "),
    };
  }

<<<<<<< HEAD
  getSeverityLevel(score) {
    if (score >= 70) return "critical";
    if (score >= 50) return "high";
    if (score >= 30) return "medium";
    return "low";
  }

=======
  /**
   * Convert numeric score to severity level
   */
  getSeverityLevel(score) {
    if (score >= 70) return "critical"; // Immediate attention needed
    if (score >= 50) return "high"; // Check today
    if (score >= 30) return "medium"; // Monitor closely
    return "low"; // Normal monitoring
  }

  /**
   * Determine if notification should be sent
   */
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
  shouldNotify(severityLevel) {
    return severityLevel === "critical" || severityLevel === "high";
  }

<<<<<<< HEAD
=======
  /**
   * Generate notification message
   */
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
