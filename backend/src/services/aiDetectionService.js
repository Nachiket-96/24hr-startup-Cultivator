const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

/**
 * AI Detection Service
 * Handles communication with Python AI/ML service for calf health analysis
 * Falls back to simulation if AI service is unavailable
 */
class AIDetectionService {
  constructor() {
    // URL of your Python Flask AI service
    this.aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:5000";
    this.useSimulation = process.env.USE_AI_SIMULATION !== "false";

    console.log(`AI Detection Service initialized`);
    console.log(`AI Service URL: ${this.aiServiceUrl}`);
    console.log(`Using Simulation: ${this.useSimulation}`);
  }

  /**
   * Analyze a single calf image using AI service
   * @param {string} imagePath - Path to the calf image
   * @param {string} calfId - Unique identifier for the calf
   * @returns {Object} Detection results with confidence scores
   */
  async analyzeCalfImage(imagePath, calfId) {
    // Check if we should use real AI or simulation
    if (this.useSimulation) {
      console.log(`🤖 Using simulated AI for ${calfId}`);
      return this.simulateDetection(calfId, imagePath);
    }

    try {
      console.log(`🔍 Sending ${calfId} to AI service for analysis...`);

      // Prepare form data with image
      const formData = new FormData();

      // Check if image file exists
      if (fs.existsSync(imagePath)) {
        formData.append("image", fs.createReadStream(imagePath));
      } else {
        console.warn(`Image not found: ${imagePath}, using simulation`);
        return this.simulateDetection(calfId, imagePath);
      }

      formData.append("calf_id", calfId);
      formData.append("timestamp", new Date().toISOString());

      // Send to Python AI service
      const response = await axios.post(
        `${this.aiServiceUrl}/api/analyze-calf`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Accept: "application/json",
          },
          timeout: 30000, // 30 second timeout
          validateStatus: (status) => status < 500, // Don't throw on 4xx errors
        }
      );

      if (response.status === 200 && response.data.success) {
        console.log(`✅ AI analysis complete for ${calfId}`);

        return {
          calfId: calfId,
          imagePath: imagePath,
          timestamp: new Date(),
          detections: this.normalizeAIResponse(response.data.analysis),
          aiConfidence: response.data.analysis.overall_confidence || 0.85,
          source: "ai-service",
        };
      } else {
        console.warn(`AI service returned error, falling back to simulation`);
        return this.simulateDetection(calfId, imagePath);
      }
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        console.warn(`AI service not available at ${this.aiServiceUrl}`);
      } else if (error.code === "ETIMEDOUT") {
        console.warn(`AI service timeout for ${calfId}`);
      } else {
        console.error(`AI analysis error for ${calfId}:`, error.message);
      }

      // Fallback to simulation
      console.log(`⚠️  Falling back to simulated detection for ${calfId}`);
      return this.simulateDetection(calfId, imagePath);
    }
  }

  /**
   * Normalize AI service response to standard format
   */
  normalizeAIResponse(aiResponse) {
    return {
      ear_position: aiResponse.ear_position || "unknown",
      eye_clarity: aiResponse.eye_clarity || "unknown",
      movement_score: aiResponse.movement_score || "unknown",
      dirty_tail: aiResponse.dirty_tail || false,
      dirty_hind_legs: aiResponse.dirty_hind_legs || false,
      snotty_nose: aiResponse.snotty_nose || false,
      is_isolated: aiResponse.is_isolated || false,
      confidence: aiResponse.overall_confidence || 0.0,
    };
  }

  /**
   * Batch analyze multiple calves from a drone run
   * @param {string} droneRunId - Unique identifier for the drone run
   * @param {Array} images - Array of {calfId, path} objects
   * @returns {Array} Array of detection results
   */
  async analyzeDroneRun(droneRunId, images) {
    console.log(
      `🚁 Analyzing drone run ${droneRunId} with ${images.length} images`
    );

    const results = [];
    let processed = 0;

    // Process images in batches to avoid overwhelming the AI service
    const batchSize = 5;
    for (let i = 0; i < images.length; i += batchSize) {
      const batch = images.slice(i, i + batchSize);

      // Process batch in parallel
      const batchPromises = batch.map((image) =>
        this.analyzeCalfImage(image.path, image.calfId)
      );

      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        processed += batchResults.length;

        console.log(
          `   Progress: ${processed}/${images.length} calves analyzed`
        );
      } catch (error) {
        console.error(`Error processing batch:`, error.message);
      }

      // Small delay between batches to avoid overwhelming the service
      if (i + batchSize < images.length) {
        await this.sleep(100);
      }
    }

    console.log(`✅ Drone run ${droneRunId} analysis complete`);
    return results;
  }

  /**
   * Simulate AI detection (for demo/testing without AI service)
   * This generates realistic detection results based on probabilities
   */
  simulateDetection(calfId, imagePath) {
    // Extract calf number from ID for consistent results
    const calfNumber = parseInt(calfId.split("-")[1]) || 0;

    // Use calf number to determine health status (deterministic for demo)
    const random = (calfNumber * 0.1234) % 1; // Pseudo-random but consistent

    let detections;

    // Specific calves with known issues (for consistent demo)
    if (calfId === "CALF-009") {
      // Critical case
      detections = {
        ear_position: "droopy",
        eye_clarity: "clear",
        movement_score: "normal",
        dirty_tail: true,
        dirty_hind_legs: true,
        snotty_nose: true,
        is_isolated: false,
        confidence: 0.92,
      };
    } else if (calfId === "CALF-012") {
      // High concern case
      detections = {
        ear_position: "droopy",
        eye_clarity: "dull",
        movement_score: "reduced",
        dirty_tail: false,
        dirty_hind_legs: false,
        snotty_nose: true,
        is_isolated: false,
        confidence: 0.87,
      };
    } else if (calfId === "CALF-005") {
      // Medium concern case
      detections = {
        ear_position: "normal",
        eye_clarity: "dull",
        movement_score: "reduced",
        dirty_tail: false,
        dirty_hind_legs: false,
        snotty_nose: false,
        is_isolated: false,
        confidence: 0.89,
      };
    } else if (random < 0.7) {
      // 70% chance: Healthy calf
      detections = {
        ear_position: "normal",
        eye_clarity: "clear",
        movement_score: "normal",
        dirty_tail: false,
        dirty_hind_legs: false,
        snotty_nose: false,
        is_isolated: false,
        confidence: 0.95,
      };
    } else if (random < 0.9) {
      // 20% chance: Mild concern
      detections = {
        ear_position: random < 0.8 ? "droopy" : "normal",
        eye_clarity: "clear",
        movement_score: "normal",
        dirty_tail: false,
        dirty_hind_legs: false,
        snotty_nose: random > 0.85,
        is_isolated: false,
        confidence: 0.87,
      };
    } else {
      // 10% chance: Serious concern
      detections = {
        ear_position: "droopy",
        eye_clarity: random > 0.95 ? "dull" : "clear",
        movement_score: random > 0.92 ? "reduced" : "normal",
        dirty_tail: random > 0.9,
        dirty_hind_legs: random > 0.9,
        snotty_nose: true,
        is_isolated: random > 0.95,
        confidence: 0.92,
      };
    }

    return {
      calfId: calfId,
      imagePath: imagePath,
      timestamp: new Date(),
      detections: detections,
      aiConfidence: detections.confidence,
      source: "simulation",
    };
  }

  /**
   * Generate random detection for testing
   * Creates completely random health status
   */
  generateRandomDetection(calfId, imagePath) {
    const earPositions = ["normal", "droopy", "down"];
    const eyeClarities = ["clear", "dull", "discharge"];
    const movementScores = ["normal", "reduced", "zero"];

    return {
      calfId: calfId,
      imagePath: imagePath,
      timestamp: new Date(),
      detections: {
        ear_position:
          earPositions[Math.floor(Math.random() * earPositions.length)],
        eye_clarity:
          eyeClarities[Math.floor(Math.random() * eyeClarities.length)],
        movement_score:
          movementScores[Math.floor(Math.random() * movementScores.length)],
        dirty_tail: Math.random() > 0.8,
        dirty_hind_legs: Math.random() > 0.8,
        snotty_nose: Math.random() > 0.7,
        is_isolated: Math.random() > 0.9,
        confidence: 0.75 + Math.random() * 0.2, // 0.75 to 0.95
      },
      aiConfidence: 0.75 + Math.random() * 0.2,
      source: "random",
    };
  }

  /**
   * Check if AI service is available
   */
  async checkAIServiceHealth() {
    try {
      const response = await axios.get(`${this.aiServiceUrl}/health`, {
        timeout: 5000,
      });

      return {
        available: response.status === 200,
        url: this.aiServiceUrl,
        status: response.data,
      };
    } catch (error) {
      return {
        available: false,
        url: this.aiServiceUrl,
        error: error.message,
      };
    }
  }

  /**
   * Utility: Sleep function for delays
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get AI service statistics
   */
  getStats() {
    return {
      serviceUrl: this.aiServiceUrl,
      usingSimulation: this.useSimulation,
      mode: this.useSimulation ? "simulation" : "ai-service",
    };
  }
}

// Export singleton instance
module.exports = new AIDetectionService();
