import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2

class EarDetectionModel:
    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)
        
    def detect_ear_position(self, image_path):
        """
        Detect if calf ears are normal, droopy, or down
        Returns: 'normal', 'droopy', or 'down' with confidence score
        """
        # Load and preprocess image
        img = cv2.imread(image_path)
        img = cv2.resize(img, (224, 224))
        img = img / 255.0
        img = np.expand_dims(img, axis=0)
        
        # Run prediction
        predictions = self.model.predict(img)
        
        # Classes: 0=normal, 1=droopy, 2=down
        class_idx = np.argmax(predictions[0])
        confidence = predictions[0][class_idx]
        
        classes = ['normal', 'droopy', 'down']
        
        return {
            'ear_position': classes[class_idx],
            'confidence': float(confidence),
            'all_probabilities': {
                'normal': float(predictions[0][0]),
                'droopy': float(predictions[0][1]),
                'down': float(predictions[0][2])
            }
        }

# Usage
detector = EarDetectionModel('models/ear_detection_model.h5')
result = detector.detect_ear_position('images/calf_001.jpg')
print(result)
# Output: {'ear_position': 'droopy', 'confidence': 0.87, ...}