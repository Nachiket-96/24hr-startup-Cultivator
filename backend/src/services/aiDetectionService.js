const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

class AIDetectionService {
  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:5000";
    this.useSimulation = process.env.USE_AI_SIMULATION !== "false";

    console.log(`AI Detection Service initialized`);
    console.log(`AI Service URL: ${this.aiServiceUrl}`);
    console.log(`Using Simulation: ${this.useSimulation}`);
  }

  async analyzeCalfImage(imagePath, calfId) {
    if (this.useSimulation) {
      console.log(`🤖 Using simulated AI for ${calfId}`);
      return this.simulateDetection(calfId, imagePath);
    }

    try {
      console.log(`🔍 Sending ${calfId} to AI service for analysis...`);

      const formData = new FormData();

      if (fs.existsSync(imagePath)) {
        formData.append("image", fs.createReadStream(imagePath));
      } else {
        console.warn(`Image not found: ${imagePath}, using simulation`);
        return this.simulateDetection(calfId, imagePath);
      }

      formData.append("calf_id", calfId);
      formData.append("timestamp", new Date().toISOString());

      const response = await axios.post(
        `${this.aiServiceUrl}/api/analyze-calf`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Accept: "application/json",
          },
          timeout: 30000,
          validateStatus: (status) => status < 500,
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

      console.log(`⚠️  Falling back to simulated detection for ${calfId}`);
      return this.simulateDetection(calfId, imagePath);
    }
  }

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

  async analyzeDroneRun(droneRunId, images) {
    console.log(
      `🚁 Analyzing drone run ${droneRunId} with ${images.length} images`
    );

    const results = [];
    let processed = 0;

    const batchSize = 5;
    for (let i = 0; i < images.length; i += batchSize) {
      const batch = images.slice(i, i + batchSize);

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

      if (i + batchSize < images.length) {
        await this.sleep(100);
      }
    }

    console.log(`✅ Drone run ${droneRunId} analysis complete`);
    return results;
  }

  simulateDetection(calfId, imagePath) {
    const calfNumber = parseInt(calfId.split("-")[1]) || 0;
    const random = (calfNumber * 0.1234) % 1;

    let detections;

    if (calfId === "CALF-009") {
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

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getStats() {
    return {
      serviceUrl: this.aiServiceUrl,
      usingSimulation: this.useSimulation,
      mode: this.useSimulation ? "simulation" : "ai-service",
    };
  }
}

module.exports = new AIDetectionService();
