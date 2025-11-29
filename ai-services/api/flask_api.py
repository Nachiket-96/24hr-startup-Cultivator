from flask import Flask, request, jsonify
from src.detect_ears import EarDetectionModel
from src.detect_eyes import EyeClarityModel
from src.detect_movement import MovementDetectionModel
from src.detect_dirty_areas import DirtyAreaModel
from src.detect_isolation import IsolationModel
import os

app = Flask(__name__)

# Load all models
ear_model = EarDetectionModel('models/ear_detection_model.h5')
eye_model = EyeClarityModel('models/eye_clarity_model.h5')
movement_model = MovementDetectionModel('models/movement_model.h5')
dirty_model = DirtyAreaModel('models/tail_detection_model.h5')
isolation_model = IsolationModel('models/isolation_model.h5')

@app.route('/api/analyze-calf', methods=['POST'])
def analyze_calf():
    """
    Analyze a single calf image
    Expects: multipart/form-data with 'image' file
    Returns: Complete health analysis
    """
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    image_path = f'/tmp/{image.filename}'
    image.save(image_path)
    
    try:
        # Run all AI models
        ear_result = ear_model.detect_ear_position(image_path)
        eye_result = eye_model.detect_eye_clarity(image_path)
        movement_result = movement_model.detect_movement(image_path)
        dirty_result = dirty_model.detect_dirty_areas(image_path)
        isolation_result = isolation_model.detect_isolation(image_path)
        
        # Combine results
        analysis = {
            'ear_position': ear_result['ear_position'],
            'ear_confidence': ear_result['confidence'],
            
            'eye_clarity': eye_result['clarity'],
            'eye_confidence': eye_result['confidence'],
            
            'movement_score': movement_result['score'],
            'movement_confidence': movement_result['confidence'],
            
            'dirty_tail': dirty_result['tail_dirty'],
            'dirty_hind_legs': dirty_result['legs_dirty'],
            'snotty_nose': dirty_result['nose_discharge'],
            
            'is_isolated': isolation_result['isolated'],
            'isolation_confidence': isolation_result['confidence'],
            
            'overall_confidence': (
                ear_result['confidence'] + 
                eye_result['confidence'] + 
                movement_result['confidence']
            ) / 3
        }
        
        # Clean up
        os.remove(image_path)
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/analyze-drone-run', methods=['POST'])
def analyze_drone_run():
    """
    Analyze multiple images from a drone run
    Expects: list of images with calf IDs
    """
    # Implementation for batch processing
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)