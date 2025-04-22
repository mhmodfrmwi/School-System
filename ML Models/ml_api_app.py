from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)

os.makedirs('models', exist_ok=True)

GRADE_THRESHOLD = 50  
ABSENCE_THRESHOLD = 10 

clf_model = None
reg_model = None

SUBJECTS = ['arabic', 'math', 'english', 'science', 'history', 'geography']

def train_models():
    """Create and train simple models based on synthetic data if models don't exist"""
    global clf_model, reg_model
    
    np.random.seed(42)
    data = []
    
    for i in range(1000):
        row = {}
        
        for subject in SUBJECTS:
            if subject in ['math', 'science']:
                mean, std = 65, 18  
            elif subject in ['arabic', 'english']:
                mean, std = 68, 15
            else:
                mean, std = 72, 12  
                
            row[subject] = np.clip(int(np.random.normal(mean, std)), 0, 100)
        

        avg = np.mean([row.get(subject, 0) for subject in SUBJECTS if subject in row])
        if avg < 50:
            absent_days = np.random.randint(8, 25)
        elif avg < 70:
            absent_days = np.random.randint(3, 15)
        else:
            absent_days = np.random.randint(0, 8)
            
        row['absent_days'] = absent_days
        
        row['status'] = 1 if avg >= GRADE_THRESHOLD and absent_days < ABSENCE_THRESHOLD else 0
        
        if avg < 40:
            potential = np.random.randint(10, 25)
        elif avg < 60:
            potential = np.random.randint(5, 15)
        elif avg < 80:
            potential = np.random.randint(2, 10)
        else:
            potential = np.random.randint(0, 5)
            
        row['future_potential'] = potential
        
        data.append(row)
    
    df = pd.DataFrame(data)
    
    X = df[SUBJECTS + ['absent_days']]
    y_status = df['status']
    y_potential = df['future_potential']
    
    print("Training classification model...")
    clf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    clf_model.fit(X, y_status)
    
    print("Training regression model...")
    reg_model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    reg_model.fit(X, y_potential)
    
    joblib.dump(clf_model, 'models/student_status_model.pkl')
    joblib.dump(reg_model, 'models/student_potential_model.pkl')
    
    print("Models trained and saved successfully!")
    return clf_model, reg_model

def load_or_train_models():
    """Load existing models or train new ones if they don't exist"""
    global clf_model, reg_model
    
    try:
        clf_model = joblib.load('models/student_status_model.pkl')
        reg_model = joblib.load('models/student_potential_model.pkl')
        print("Models loaded successfully!")
    except FileNotFoundError:
        print("Models not found. Training new models...")
        clf_model, reg_model = train_models()

def generate_suggestions(subject, score, potential_improvement):
    """
    Generate personalized suggestions based on subject and score
    with expected impact on improvement
    """
   
    suggestions_by_subject = {
        "arabic": [
            {
                "action": "Practice reading Arabic texts daily",
                "explanation": "Regular reading improves comprehension and vocabulary acquisition",
                "impact": 0.3,  
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Complete additional grammar exercises",
                "explanation": "Strengthens foundational grammar skills needed for writing and comprehension",
                "impact": 0.25,
                "timeframe": "1-2 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Write Arabic compositions weekly",
                "explanation": "Improves writing skills and helps apply grammar rules in practice",
                "impact": 0.35,
                "timeframe": "3-4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Work with a tutor on pronunciation and vocabulary",
                "explanation": "Personalized guidance helps address specific weaknesses",
                "impact": 0.4,
                "timeframe": "2-4 weeks",
                "difficulty": "medium"
            }
        ],
        "math": [
            {
                "action": "Focus on solving additional practice problems daily",
                "explanation": "Repetition builds mathematical fluency and reinforces concepts",
                "impact": 0.35,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Create formula sheets for quick reference",
                "explanation": "Helps memorize essential formulas and understand their applications",
                "impact": 0.25,
                "timeframe": "1 week",
                "difficulty": "low"
            },
            {
                "action": "Watch video tutorials for difficult concepts",
                "explanation": "Visual learning helps grasp abstract concepts more effectively",
                "impact": 0.3,
                "timeframe": "1-2 weeks",
                "difficulty": "low"
            },
            {
                "action": "Form a study group for challenging topics",
                "explanation": "Peer learning increases engagement and provides different perspectives",
                "impact": 0.35,
                "timeframe": "3-4 weeks",
                "difficulty": "medium"
            }
        ],
        "english": [
            {
                "action": "Read English books or articles daily",
                "explanation": "Exposure to language patterns improves comprehension and vocabulary",
                "impact": 0.3,
                "timeframe": "2-4 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Practice writing essays and summaries twice weekly",
                "explanation": "Develops writing skills and ability to organize thoughts",
                "impact": 0.35,
                "timeframe": "3-4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Expand vocabulary with daily word lists",
                "explanation": "Building vocabulary directly improves reading and writing abilities",
                "impact": 0.25,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Practice speaking with English language partners",
                "explanation": "Improves fluency and builds confidence in language use",
                "impact": 0.3,
                "timeframe": "3-4 weeks",
                "difficulty": "medium"
            }
        ],
        "science": [
            {
                "action": "Create detailed notes with diagrams for each topic",
                "explanation": "Visual representation helps understand complex scientific processes",
                "impact": 0.3,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Perform simple experiments to understand concepts",
                "explanation": "Hands-on learning reinforces theoretical knowledge",
                "impact": 0.4,
                "timeframe": "2-4 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Use flashcards for scientific terminology",
                "explanation": "Helps memorize key terms needed for explanation questions",
                "impact": 0.25,
                "timeframe": "1-2 weeks",
                "difficulty": "low"
            },
            {
                "action": "Connect concepts to real-world applications",
                "explanation": "Contextual learning improves retention and understanding",
                "impact": 0.35,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            }
        ],
        "history": [
            {
                "action": "Create timeline charts for historical events",
                "explanation": "Visual chronology helps understand cause-effect relationships",
                "impact": 0.3,
                "timeframe": "1-2 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Use mnemonic devices for important dates",
                "explanation": "Memory techniques improve recall of key historical facts",
                "impact": 0.25,
                "timeframe": "1 week",
                "difficulty": "low"
            },
            {
                "action": "Study historical cause and effect relationships",
                "explanation": "Understanding why events happened improves analytical responses",
                "impact": 0.35,
                "timeframe": "2-3 weeks",
                "difficulty": "high"
            },
            {
                "action": "Discuss historical topics with peers",
                "explanation": "Discussion strengthens understanding and develops critical thinking",
                "impact": 0.3,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            }
        ],
        "geography": [
            {
                "action": "Practice with maps and geographical tools regularly",
                "explanation": "Improves spatial awareness and geographical knowledge",
                "impact": 0.35,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Create flashcards for key locations and features",
                "explanation": "Helps memorize essential geographical information",
                "impact": 0.25,
                "timeframe": "1-2 weeks",
                "difficulty": "low"
            },
            {
                "action": "Study the relationships between geography and human activities",
                "explanation": "Understanding connections improves analytical responses",
                "impact": 0.3,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            },
            {
                "action": "Use online resources for interactive geography learning",
                "explanation": "Interactive maps and tools enhance understanding of spatial concepts",
                "impact": 0.3,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            }
        ]
    }
    
    default_suggestions = [
        {
            "action": "Increase study time for this subject by 30 minutes daily",
            "explanation": "Regular focused study improves understanding and retention",
            "impact": 0.3,
            "timeframe": "2-3 weeks",
            "difficulty": "medium"
        },
        {
            "action": "Create a structured study plan with specific goals",
            "explanation": "Organized approach ensures all topics are covered systematically",
            "impact": 0.25,
            "timeframe": "1 week",
            "difficulty": "low"
        },
        {
            "action": "Seek additional help from teachers for difficult topics",
            "explanation": "Direct guidance addresses specific knowledge gaps",
            "impact": 0.4,
            "timeframe": "2-3 weeks",
            "difficulty": "medium"
        },
        {
            "action": "Practice with past exam questions weekly",
            "explanation": "Familiarizes with exam format and common question types",
            "impact": 0.35,
            "timeframe": "3-4 weeks",
            "difficulty": "medium"
        }
    ]
    
    high_impact_suggestions = {
        "arabic": [
            {
                "action": "Join a language immersion program or club",
                "explanation": "Full immersion dramatically accelerates language acquisition",
                "impact": 0.6,
                "timeframe": "4-8 weeks",
                "difficulty": "high"
            },
            {
                "action": "Read Arabic news articles daily and summarize in your own words",
                "explanation": "Combines reading, comprehension and writing practice",
                "impact": 0.5,
                "timeframe": "3-5 weeks",
                "difficulty": "high"
            }
        ],
        "math": [
            {
                "action": "Complete an intensive problem-solving boot camp",
                "explanation": "Focused practice on difficult problems builds advanced skills",
                "impact": 0.55,
                "timeframe": "2-4 weeks",
                "difficulty": "very high"
            },
            {
                "action": "Teach math concepts to others after mastering them",
                "explanation": "Teaching others solidifies your own understanding",
                "impact": 0.5,
                "timeframe": "3-6 weeks",
                "difficulty": "high"
            }
        ],
        "english": [
            {
                "action": "Complete a daily writing challenge for one month",
                "explanation": "Intensive writing practice rapidly improves language skills",
                "impact": 0.55,
                "timeframe": "4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Consume all media (TV, reading, internet) in English only",
                "explanation": "Full immersion significantly accelerates language acquisition",
                "impact": 0.6,
                "timeframe": "3-8 weeks",
                "difficulty": "high"
            }
        ],
        "science": [
            {
                "action": "Complete a hands-on science project related to current topics",
                "explanation": "Applied learning creates deeper understanding of concepts",
                "impact": 0.55,
                "timeframe": "3-4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Join a science club or participate in science competitions",
                "explanation": "Practical application and peer learning enhances understanding",
                "impact": 0.6,
                "timeframe": "4-8 weeks",
                "difficulty": "high"
            }
        ],
        "history": [
            {
                "action": "Create detailed historical event analysis documents",
                "explanation": "Deep analysis develops critical thinking about historical events",
                "impact": 0.55,
                "timeframe": "3-4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Visit historical sites or museums with guided learning",
                "explanation": "Experiential learning creates lasting mental connections",
                "impact": 0.5,
                "timeframe": "2-3 weeks",
                "difficulty": "medium"
            }
        ],
        "geography": [
            {
                "action": "Create a detailed project mapping geographical features and their impacts",
                "explanation": "Project-based learning builds comprehensive understanding",
                "impact": 0.55,
                "timeframe": "3-4 weeks",
                "difficulty": "high"
            },
            {
                "action": "Practice geographical analysis with case studies weekly",
                "explanation": "Applied analysis develops advanced geographical thinking",
                "impact": 0.5,
                "timeframe": "4-6 weeks",
                "difficulty": "high"
            }
        ]
    }
    
    default_high_impact = [
        {
            "action": "Find a specialized tutor for twice-weekly sessions",
            "explanation": "Professional guidance addresses specific weaknesses efficiently",
            "impact": 0.6,
            "timeframe": "4-8 weeks",
            "difficulty": "high"
        },
        {
            "action": "Complete an intensive study program with daily practice",
            "explanation": "Concentrated effort can rapidly improve performance",
            "impact": 0.55,
            "timeframe": "3-6 weeks",
            "difficulty": "very high"
        }
    ]
    
    if score < 40:
        priority = "critical"
        count = 4  
    elif score < 50:
        priority = "high"
        count = 3  
    elif score < 70:
        priority = "medium"
        count = 2  
    else:
        priority = "low"
        count = 1  
    
    subject_suggestions = suggestions_by_subject.get(subject.lower(), default_suggestions)
    beyond_potential_suggestions = high_impact_suggestions.get(subject.lower(), default_high_impact)
    
    subject_suggestions = sorted(subject_suggestions, key=lambda x: x['impact'], reverse=True)
    beyond_potential_suggestions = sorted(beyond_potential_suggestions, key=lambda x: x['impact'], reverse=True)
    
    for suggestion in subject_suggestions:
        suggestion['expected_points_improvement'] = round(potential_improvement * suggestion['impact'])
    
    enhanced_potential = potential_improvement * 1.5  
    for suggestion in beyond_potential_suggestions:
        suggestion['expected_points_improvement'] = round(enhanced_potential * suggestion['impact'])
    
    return {
        "improvement_priority": priority,
        "standard_suggestions": subject_suggestions[:count],
        "beyond_potential_suggestions": beyond_potential_suggestions[:2]  
    }

def predict_future_performance(subject, current_score, potential_improvement):
    """Predict future performance based on current score and potential improvement"""
    predicted_score = min(current_score + potential_improvement, 100)
    
    if subject.lower() in ["math", "science"]:
        confidence = "high" if current_score > 60 else "medium"
    else:
        confidence = "medium" if current_score > 70 else "moderate"
    
    if predicted_score >= 90:
        predicted_grade = "A"
    elif predicted_score >= 80:
        predicted_grade = "B"
    elif predicted_score >= 70:
        predicted_grade = "C"
    elif predicted_score >= 60:
        predicted_grade = "D"
    elif predicted_score >= 50:
        predicted_grade = "E"
    else:
        predicted_grade = "F"
    
    return {
        "current_score": current_score,
        "predicted_score": predicted_score,
        "predicted_grade": predicted_grade,
        "potential_improvement": potential_improvement,
        "prediction_confidence": confidence,
        "timeframe": "Next exam period"
    }

def evaluate_attendance(absent_days):
    """Evaluate student attendance and provide recommendations"""
    if absent_days >= ABSENCE_THRESHOLD:
        return {
            "status": "Poor",
            "impact": "High negative impact on academic performance",
            "estimated_grade_penalty": "-10 to -15 points",
            "recommendation": "Urgent improvement needed in attendance"
        }
    elif absent_days >= ABSENCE_THRESHOLD * 0.7:  
        return {
            "status": "Concerning",
            "impact": "May negatively affect academic performance",
            "estimated_grade_penalty": "-5 to -10 points",
            "recommendation": "Improve attendance to avoid academic penalties"
        }
    elif absent_days >= ABSENCE_THRESHOLD * 0.4:  
        return {
            "status": "Adequate",
            "impact": "Minor impact on academic performance",
            "estimated_grade_penalty": "-1 to -5 points",
            "recommendation": "Maintain better attendance for optimal learning"
        }
    else:
        return {
            "status": "Excellent",
            "impact": "Positive impact on academic performance",
            "estimated_grade_penalty": "No penalty",
            "recommendation": "Continue maintaining good attendance"
        }

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint that accepts subject scores and absent days"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        absent_days = data.get('absent_days', 0)
        
        provided_subjects = {}
        for subject in SUBJECTS:
            if subject.lower() in data:
                provided_subjects[subject] = data[subject]
            elif subject.capitalize() in data:
                provided_subjects[subject] = data[subject.capitalize()]
        
        if not provided_subjects:
            return jsonify({'error': 'No valid subject scores provided'}), 400
        
        model_input = {subject: 0 for subject in SUBJECTS}
        model_input['absent_days'] = absent_days
        
        for subject, score in provided_subjects.items():
            model_input[subject.lower()] = score
        
        df = pd.DataFrame([model_input])
        
        subject_scores = [score for subject, score in provided_subjects.items()]
        avg_score = sum(subject_scores) / len(subject_scores) if subject_scores else 0
        
        status_pred = int(clf_model.predict(df)[0])
        potential_pred = int(reg_model.predict(df)[0])
        
        attendance_evaluation = evaluate_attendance(absent_days)
        
        response = {
            "overall_status": "Pass" if status_pred == 1 else "Fail",
            "avg_score": round(avg_score, 1),
            "attendance": {
                "absent_days": absent_days,
                "evaluation": attendance_evaluation
            },
            "subjects": {}
        }
        
        for subject, score in provided_subjects.items():
            if score < 40:
                performance_level = "Poor"
            elif score < GRADE_THRESHOLD:
                performance_level = "Below Average"
            elif score < 70:
                performance_level = "Average"
            elif score < 85:
                performance_level = "Good"
            else:
                performance_level = "Excellent"

            subject_potential = max(3, potential_pred - (score // 10))
            
            response["subjects"][subject.lower()] = {
                "current_evaluation": {
                    "score": score,
                    "performance_level": performance_level,
                    "status": "Pass" if score >= GRADE_THRESHOLD else "Fail"
                },
                "future_prediction": predict_future_performance(subject, score, subject_potential),
                "improvement_plan": generate_suggestions(subject, score, subject_potential)
            }
        
        return jsonify(response)
    
    except Exception as e:
        import traceback
        return jsonify({
            'error': str(e),
            'traceback': traceback.format_exc()
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint to verify API status"""
    return jsonify({
        'status': 'ok', 
        'models_loaded': bool(clf_model and reg_model),
        'available_subjects': SUBJECTS,
        'model_parameters': {
            'absence_threshold': ABSENCE_THRESHOLD,
            'grade_threshold': GRADE_THRESHOLD
        }
    })

@app.route('/example', methods=['GET'])
def example():
    """Returns an example prediction for demonstration purposes"""
    example_data = {
        "science": 53,
        "absent_days": 8
    }
    
    if clf_model is None or reg_model is None:
        load_or_train_models()
    
    with app.test_request_context(json=example_data, method='POST'):
        return predict()

load_or_train_models()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)