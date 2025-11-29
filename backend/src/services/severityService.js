class SeverityService {
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

    // Dirty tail (0-10 points)
    if (detections.dirty_tail) {
      score += 10;
      concerns.push("Dirty tail (possible scours)");
    }

    // Dirty hind legs (0-10 points)
    if (detections.dirty_hind_legs) {
      score += 10;
      concerns.push("Dirty hind legs");
    }

    // Snotty nose (0-15 points)
    if (detections.snotty_nose) {
      score += 15;
      concerns.push("Snotty nose (respiratory concern)");
    }

    // Isolation (0-15 points)
    if (detections.is_isolated) {
      score += 15;
      concerns.push("Isolated from herd");
    }

    const level = this.getSeverityLevel(score);

    return {
      score: Math.min(score, 100),
      level: level,
      concerns: concerns,
      aiNotes: concerns.join(", "),
    };
  }

  getSeverityLevel(score) {
    if (score >= 70) return "critical";
    if (score >= 50) return "high";
    if (score >= 30) return "medium";
    return "low";
  }

  shouldNotify(severityLevel) {
    return severityLevel === "critical" || severityLevel === "high";
  }

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
