import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor, RandomForestRegressor
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import os
import json

np.random.seed(42)

os.makedirs('models', exist_ok=True)
os.makedirs('visualizations', exist_ok=True)

GRADE_DISTRIBUTIONS = {
    'arabic': (55, 15),   
    'math': (60, 18),
    'english': (65, 16),
    'science': (62, 17),
    'history': (68, 14),
    'geography': (64, 15),
    'social_studies': (66, 13),
    'religion': (75, 12),
    'computer': (70, 15),
    'arts': (80, 10),
    'physical_education': (85, 8)
}

CHANGE_FACTORS = {
    'improvement': [
        'increased_study_time',
        'tutor_assistance',
        'better_attendance',
        'more_participation',
        'improved_health',
        'reduced_distractions'
    ],
    'decline': [
        'increased_absences',
        'health_issues',
        'family_problems',
        'reduced_motivation',
        'increased_distractions',
        'social_issues'
    ],
    'neutral': [
        'consistent_habits',
        'stable_environment',
        'no_major_changes'
    ]
}

def generate_synthetic_data(n_samples=1000, include_temporal=True, n_semesters=3):
    """
    Generate synthetic student data with temporal information across multiple semesters
    to enable trend analysis and more realistic predictions.
    """
    data = []
    
    for i in range(n_samples):
        student_id = i + 1000
        student_year = np.random.randint(1, 4) 
        student_gender = np.random.choice(['male', 'female'])
        student_age = np.random.randint(15, 19)
        
        initial_records = {}
        
        for subject, (mean, std) in GRADE_DISTRIBUTIONS.items():
            initial_records[subject] = np.clip(int(np.random.normal(mean, std)), 0, 100)
        
        avg_grade = np.mean([initial_records[subject] for subject in GRADE_DISTRIBUTIONS.keys()])
        
        if avg_grade < 50:
            absent_days = np.random.randint(10, 30)
            student_profile = 'struggling'
        elif avg_grade < 70:
            absent_days = np.random.randint(5, 15)
            student_profile = 'average'
        else:
            absent_days = np.random.randint(0, 8)
            student_profile = 'high_performing'
            
        initial_records['absent_days'] = absent_days
        
        for semester in range(1, n_semesters + 1):

            if semester > 1:
                if student_profile == 'struggling':
                    trajectory = np.random.choice(['improve', 'same', 'decline'], 
                                                p=[0.3, 0.5, 0.2])
                elif student_profile == 'average':
                    trajectory = np.random.choice(['improve', 'same', 'decline'], 
                                                p=[0.35, 0.4, 0.25])
                else:  
                    trajectory = np.random.choice(['improve', 'same', 'decline'], 
                                                p=[0.15, 0.6, 0.25])
                
                if trajectory == 'improve':
                    grade_shift = np.random.uniform(2, 8)
                    absence_shift = -np.random.randint(1, 5)
                    selected_factors = np.random.choice(CHANGE_FACTORS['improvement'], 
                                                      size=np.random.randint(1, 4), 
                                                      replace=False)
                elif trajectory == 'decline':
                    grade_shift = -np.random.uniform(2, 8)
                    absence_shift = np.random.randint(1, 7)
                    selected_factors = np.random.choice(CHANGE_FACTORS['decline'], 
                                                      size=np.random.randint(1, 4), 
                                                      replace=False)
                else:  
                    grade_shift = np.random.uniform(-1.5, 1.5)
                    absence_shift = np.random.randint(-1, 2)
                    selected_factors = np.random.choice(CHANGE_FACTORS['neutral'], 
                                                      size=np.random.randint(1, 3), 
                                                      replace=False)
                
                for subject in GRADE_DISTRIBUTIONS.keys():
                    subject_variation = np.random.uniform(-2, 2)
                    new_grade = initial_records[subject] + grade_shift + subject_variation
                    initial_records[subject] = np.clip(int(new_grade), 0, 100)
                
                new_absences = max(0, initial_records['absent_days'] + absence_shift)
                initial_records['absent_days'] = new_absences
            
            row = {
                'student_id': student_id,
                'semester': semester,
                'year': student_year,
                'gender': student_gender,
                'age': student_age
            }
            
            for subject, grade in initial_records.items():
                if subject != 'absent_days':
                    row[subject] = grade
            
            row['absent_days'] = initial_records['absent_days']
            
            core_subjects = ['arabic', 'math', 'english', 'science']
            row['core_avg'] = np.mean([row[subject] for subject in core_subjects])
            row['overall_avg'] = np.mean([row[subject] for subject in GRADE_DISTRIBUTIONS.keys()])
            
            if row['core_avg'] >= 75 and row['absent_days'] < 5:
                row['status'] = 2  
            elif row['core_avg'] >= 50 and row['absent_days'] < 10:
                row['status'] = 1  
            else:
                row['status'] = 0  
            
            if semester > 1:
                row['trajectory'] = trajectory
                row['change_factors'] = ','.join(selected_factors)
            
            data.append(row)
    
    df = pd.DataFrame(data)
    
    if include_temporal and n_semesters > 1:
        temp_df = df.copy()
        
        grouped = temp_df.sort_values(['student_id', 'semester']).groupby('student_id')
        
        for subject in GRADE_DISTRIBUTIONS.keys():
            df[f'{subject}_change'] = grouped[subject].diff()
        
        df['absence_change'] = grouped['absent_days'].diff()
        
        df['core_avg_change'] = grouped['core_avg'].diff()
        df['overall_avg_change'] = grouped['overall_avg'].diff()
        
        for col in df.columns:
            if col.endswith('_change'):
                df[col] = df[col].fillna(0)
    
    return df

df = generate_synthetic_data(1500, n_semesters=3)
df.to_csv('student_data_temporal.csv', index=False)
print(f"✅ Generated temporal dataset with {len(df)} student records across multiple semesters")

def analyze_dataset(df):
    """
    Enhanced analysis function to include trends and trajectories
    """
    print("\n==== Dataset Statistics ====")
    print(f"Total records: {len(df)}")
    print(f"Total students: {df['student_id'].nunique()}")
    print(f"Semesters per student: {df['semester'].nunique()}")
    
    print(f"\nStatus distribution: {df['status'].value_counts().to_dict()}")
    
    print(f"\nAverage grades by status:")
    for status, group in df.groupby('status'):
        status_name = {0: "Fail", 1: "Pass", 2: "Distinction"}[status]
        print(f"  - {status_name}: {group['overall_avg'].mean():.2f}")
    
    if 'trajectory' in df.columns:
        trajectory_df = df[df['semester'] > 1]
        print(f"\nTrajectory distribution:")
        print(trajectory_df['trajectory'].value_counts(normalize=True).apply(lambda x: f"{x:.1%}"))
    
    plt.figure(figsize=(12, 10))
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    selected_cols = ['overall_avg', 'core_avg', 'absent_days', 'status']
    
    change_cols = [col for col in numeric_cols if col.endswith('_change') and not col.startswith('temp_')]
    if change_cols:
        selected_cols.extend(['overall_avg_change', 'core_avg_change', 'absence_change'])
    
    corr = df[selected_cols].corr()
    sns.heatmap(corr, annot=True, cmap='coolwarm', linewidths=0.5)
    plt.title('Key Feature Correlation Heatmap')
    plt.tight_layout()
    plt.savefig('visualizations/correlation_heatmap.png')
    
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='absent_days', y='overall_avg', hue='status', data=df, palette='viridis')
    plt.title('Relationship between Absence Days and Overall Average')
    plt.xlabel('Absent Days')
    plt.ylabel('Overall Average')
    plt.savefig('visualizations/absence_vs_performance.png')
    
    plt.figure(figsize=(14, 8))
    subject_cols = [col for col in df.columns if col in GRADE_DISTRIBUTIONS.keys()]
    df_melted = pd.melt(df, id_vars=['student_id'], value_vars=subject_cols, var_name='Subject', value_name='Score')
    sns.boxplot(x='Subject', y='Score', data=df_melted)
    plt.title('Distribution of Scores by Subject')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('visualizations/subject_score_distribution.png')
    
    if 'semester' in df.columns and df['semester'].nunique() > 1:
        plt.figure(figsize=(12, 6))
        semester_avg = df.groupby('semester')['overall_avg'].mean()
        semester_avg.plot(kind='line', marker='o')
        plt.title('Average Performance by Semester')
        plt.xlabel('Semester')
        plt.ylabel('Average Grade')
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.savefig('visualizations/performance_by_semester.png')
        
        if 'overall_avg_change' in df.columns:
            plt.figure(figsize=(10, 6))
            change_data = df[df['semester'] > 1]['overall_avg_change']
            sns.histplot(change_data, kde=True)
            plt.axvline(x=0, color='r', linestyle='--')
            plt.title('Distribution of Grade Changes Between Semesters')
            plt.xlabel('Change in Overall Average')
            plt.ylabel('Frequency')
            plt.savefig('visualizations/grade_change_distribution.png')
            
            if 'trajectory' in df.columns:
                plt.figure(figsize=(12, 8))
                trajectory_df = df[df['semester'] > 1]
                sns.boxplot(x='trajectory', y='overall_avg_change', data=trajectory_df)
                plt.title('Grade Changes by Trajectory')
                plt.xlabel('Trajectory')
                plt.ylabel('Change in Overall Average')
                plt.savefig('visualizations/trajectory_grade_changes.png')
    
    print("\n✅ Dataset analysis complete. Visualizations saved.")

analyze_dataset(df)

def prepare_data_for_prediction(df):
    """
    Prepare data for both status and performance prediction models,
    including trend features for improved forecasting.
    """

    latest_semester = df['semester'].max()
    
    train_df = df[df['semester'] < latest_semester]
    test_df = df[df['semester'] == latest_semester]
    
    subject_cols = [col for col in df.columns if col in GRADE_DISTRIBUTIONS.keys()]
    categorical_features = ['gender', 'year']
    numeric_base_features = subject_cols + ['age', 'absent_days']
    
    trend_features = [col for col in df.columns if col.endswith('_change')]
    numeric_features = numeric_base_features + trend_features
    
    X_train = train_df[categorical_features + numeric_features]
    y_status_train = train_df['status']
    y_perf_train = train_df['overall_avg']
    
    X_test = test_df[categorical_features + numeric_features]
    y_status_test = test_df['status']
    y_perf_test = test_df['overall_avg']
    
    if 'trajectory' in train_df.columns:
        trajectory_mapping = {'improve': 1, 'same': 0, 'decline': -1}
        train_df['trajectory_encoded'] = train_df['trajectory'].map(trajectory_mapping)
        test_df['trajectory_encoded'] = test_df['trajectory'].map(trajectory_mapping)
        
        y_traj_train = train_df['trajectory_encoded']
        y_traj_test = test_df['trajectory_encoded']
    else:
        y_traj_train = None
        y_traj_test = None
    
    return (X_train, X_test, y_status_train, y_status_test, y_perf_train, y_perf_test,
            y_traj_train, y_traj_test, categorical_features, numeric_features)

(X_train, X_test, y_status_train, y_status_test, y_perf_train, y_perf_test,
 y_traj_train, y_traj_test, categorical_features, numeric_features) = prepare_data_for_prediction(df)

def create_preprocessor(categorical_features, numeric_features):
    categorical_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    numeric_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    preprocessor = ColumnTransformer([
        ('cat', categorical_transformer, categorical_features),
        ('num', numeric_transformer, numeric_features)
    ])
    
    return preprocessor

preprocessor = create_preprocessor(categorical_features, numeric_features)

def train_status_model(X_train, y_train, preprocessor):
    clf_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])
    
    param_grid = {
        'classifier__n_estimators': [50, 100],
        'classifier__max_depth': [None, 10],
        'classifier__min_samples_split': [2, 5]
    }
    
    grid_search = GridSearchCV(
        clf_pipeline, param_grid, cv=3, 
        scoring='accuracy', n_jobs=-1, verbose=1
    )
    
    print("\nTraining status classification model...")
    grid_search.fit(X_train, y_train)
    
    best_model = grid_search.best_estimator_
    print(f"Best parameters: {grid_search.best_params_}")
    
    return best_model

def train_performance_model(X_train, y_train, preprocessor):
    reg_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(random_state=42))
    ])
    
    param_grid = {
        'regressor__n_estimators': [50, 100],
        'regressor__learning_rate': [0.05, 0.1],
        'regressor__max_depth': [3, 5]
    }
    
    grid_search = GridSearchCV(
        reg_pipeline, param_grid, cv=3, 
        scoring='neg_mean_squared_error', n_jobs=-1, verbose=1
    )
    
    print("\nTraining performance regression model...")
    grid_search.fit(X_train, y_train)
    
    best_model = grid_search.best_estimator_
    print(f"Best parameters: {grid_search.best_params_}")
    
    return best_model

def train_trajectory_model(X_train, y_train, preprocessor):
    """
    Train a model to predict if a student will improve, decline, or stay the same.
    This is essentially a classification problem with 3 classes.
    """
    mask = ~pd.isna(y_train)
    X_train_clean = X_train[mask]
    y_train_clean = y_train[mask]
    
    if len(y_train_clean) == 0:
        print("Warning: No valid trajectory data available for training.")
        return None
    
    clf_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])
    
    param_grid = {
        'classifier__n_estimators': [50, 100],
        'classifier__max_depth': [None, 10],
        'classifier__min_samples_split': [2, 5]
    }
    
    grid_search = GridSearchCV(
        clf_pipeline, param_grid, cv=3, 
        scoring='accuracy', n_jobs=-1, verbose=1
    )
    
    print("\nTraining trajectory prediction model...")
    grid_search.fit(X_train_clean, y_train_clean)
    
    best_model = grid_search.best_estimator_
    print(f"Best parameters: {grid_search.best_params_}")
    
    return best_model

status_model = train_status_model(X_train, y_status_train, preprocessor)
performance_model = train_performance_model(X_train, y_perf_train, preprocessor)

if y_traj_train is not None:
    trajectory_model = train_trajectory_model(X_train, y_traj_train, preprocessor)
    print("✅ Trained trajectory prediction model.")
else:
    trajectory_model = None
    print("⚠️ No trajectory data available. Trajectory model not trained.")

def evaluate_status_model(model, X_test, y_test):
    print("\n==== Status Classification Model Evaluation ====")
    y_pred = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Fail', 'Pass', 'Distinction']))
    
    plt.figure(figsize=(8, 6))
    cm = pd.crosstab(y_test, y_pred, rownames=['Actual'], colnames=['Predicted'])
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.savefig('visualizations/status_confusion_matrix.png')
    
    return accuracy

def evaluate_performance_model(model, X_test, y_test):
    print("\n==== Performance Regression Model Evaluation ====")
    y_pred = model.predict(X_test)
    
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Mean Squared Error: {mse:.4f}")
    print(f"Root Mean Squared Error: {rmse:.4f}")
    print(f"R² Score: {r2:.4f}")
    
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, y_pred, alpha=0.5)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
    plt.xlabel('Actual Performance')
    plt.ylabel('Predicted Performance')
    plt.title('Predicted vs Actual Performance')
    plt.savefig('visualizations/performance_prediction.png')
    
    # Plot prediction errors
    plt.figure(figsize=(10, 6))
    errors = y_test - y_pred
    plt.hist(errors, bins=30, alpha=0.7)
    plt.axvline(x=0, color='r', linestyle='--')
    plt.xlabel('Prediction Error')
    plt.ylabel('Frequency')
    plt.title('Distribution of Prediction Errors')
    plt.savefig('visualizations/performance_prediction_errors.png')
    
    return rmse, r2

def evaluate_trajectory_model(model, X_test, y_test):
    """
    Evaluate the trajectory prediction model.
    """
    print("\n==== Trajectory Prediction Model Evaluation ====")
    y_pred = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    
    trajectory_labels = {1: 'Improve', 0: 'Same', -1: 'Decline'}
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=[trajectory_labels[i] for i in sorted(list(set(y_test)))]))
    
    plt.figure(figsize=(8, 6))
    cm = pd.crosstab(y_test, y_pred, rownames=['Actual'], colnames=['Predicted'])
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Trajectory Prediction Confusion Matrix')
    plt.savefig('visualizations/trajectory_confusion_matrix.png')
    
    return accuracy

status_accuracy = evaluate_status_model(status_model, X_test, y_status_test)
perf_rmse, perf_r2 = evaluate_performance_model(performance_model, X_test, y_perf_test)

if trajectory_model is not None and y_traj_test is not None:
    traj_accuracy = evaluate_trajectory_model(trajectory_model, X_test, y_traj_test)

joblib.dump(status_model, 'models/student_status_model.pkl')
joblib.dump(performance_model, 'models/student_perf_model.pkl')
if trajectory_model is not None:
    joblib.dump(trajectory_model, 'models/student_trajectory_model.pkl')

model_metadata = {
    'status_model': {
        'accuracy': float(status_accuracy),
        'features': categorical_features + numeric_features,
        'classes': ['Fail', 'Pass', 'Distinction']
    },
    'performance_model': {
        'rmse': float(perf_rmse),
        'r2': float(perf_r2),
        'features': categorical_features + numeric_features
    },
    'thresholds': {
        'distinction': 75,
        'pass': 50,
        'attendance_critical': 10,
        'attendance_concern': 5
    }
}

if trajectory_model is not None:
    model_metadata['trajectory_model'] = {
        'accuracy': float(traj_accuracy),
        'features': categorical_features + numeric_features,
        'classes': ['Decline', 'Same', 'Improve']
    }

with open('models/model_metadata.json', 'w') as f:
    json.dump(model_metadata, f, indent=4)

print("\n✅ Models trained, evaluated and saved successfully!")
print(f"Status Model Accuracy: {status_accuracy:.4f}")
print(f"Performance Model RMSE: {perf_rmse:.4f}, R²: {perf_r2:.4f}")
if trajectory_model is not None:
    print(f"Trajectory Model Accuracy: {traj_accuracy:.4f}")
print("Model files saved in the 'models' directory.")
print("Visualizations saved in the 'visualizations' directory.")

def predict_student_future(student_data, models_path='models/'):
    """
    Make comprehensive predictions about a student's future performance.
    This function provides realistic predictions including improvement, decline, or stability.
    
    Parameters:
    -----------
    student_data : dict
        Dictionary containing student features
    models_path : str
        Path to the directory containing trained models
    
    Returns:
    --------
    dict
        Predictions and explanations
    """
    status_model = joblib.load(os.path.join(models_path, 'student_status_model.pkl'))
    performance_model = joblib.load(os.path.join(models_path, 'student_perf_model.pkl'))
    
    trajectory_model_path = os.path.join(models_path, 'student_trajectory_model.pkl')
    if os.path.exists(trajectory_model_path):
        trajectory_model = joblib.load(trajectory_model_path)
        has_trajectory_model = True
    else:
        has_trajectory_model = False
    
    with open(os.path.join(models_path, 'model_metadata.json'), 'r') as f:
        metadata = json.load(f)
    
    student_df = pd.DataFrame([student_data])
    
    status_pred = status_model.predict(student_df)[0]
    status_proba = status_model.predict_proba(student_df)[0]
    
    performance_pred = performance_model.predict(student_df)[0]
    
    results = {
        'status': {
            'prediction': int(status_pred),
            'label': metadata['status_model']['classes'][int(status_pred)],
            'confidence': float(status_proba[int(status_pred)]),
            'probabilities': {
                metadata['status_model']['classes'][i]: float(prob) 
                for i, prob in enumerate(status_proba)
            }
        },
        'performance': {
            'prediction': float(performance_pred)
        }
    }
    
    if has_trajectory_model:
        trajectory_pred = trajectory_model.predict(student_df)[0]
        trajectory_proba = trajectory_model.predict_proba(student_df)[0]
        
        trajectory_mapping = {-1: 'decline', 0: 'same', 1: 'improve'}
        trajectory_label = trajectory_mapping[trajectory_pred]
        
        results['trajectory'] = {
            'prediction': trajectory_label,
            'confidence': float(trajectory_proba[int(trajectory_pred) + 1]),  # +1 to adjust for -1, 0, 1 mapping
            'probabilities': {
                'decline': float(trajectory_proba[0]),
                'same': float(trajectory_proba[1]),
                'improve': float(trajectory_proba[2])
            }
        }
        
        if trajectory_label == 'improve':
            explanations = [
                "Consistent attendance patterns suggest increased engagement",
                "Recent improvements in core subjects indicate developing study habits",
                "Performance trend shows positive momentum"
            ]
        elif trajectory_label == 'decline':
            explanations = [
                "Increasing absence patterns are concerning",
                "Recent decreases in performance in key subjects",
                "Performance trend shows negative momentum"
            ]
        else:  
            explanations = [
                "Current performance patterns appear stable",
                "No significant changes detected in key indicators",
                "Student likely to maintain current achievement level"
            ]
        
        results['explanations'] = explanations
    
    results['confidence_level'] = 'medium' if results['status']['confidence'] < 0.7 else 'high'
    
    status_recommendations = {
        0: [ 
            "Implement immediate intervention strategies",
            "Schedule parent-teacher conference",
            "Consider additional tutoring support"
        ],
        1: [  
            "Monitor progress closely",
            "Provide targeted support in weaker subjects",
            "Encourage consistent attendance"
        ],
        2: [  
            "Provide enrichment opportunities",
            "Consider advanced placement options",
            "Maintain current support systems"
        ]
    }
    
    results['recommendations'] = status_recommendations[status_pred]
    
    return results

print("\n==== Sample Student Prediction ====")
sample_student = df[df['semester'] == df['semester'].max()].iloc[0].to_dict()
sample_student = {k: v.item() if hasattr(v, 'item') else v for k, v in sample_student.items()}

prediction_result = predict_student_future(sample_student)
print(json.dumps(prediction_result, indent=2))

with open('test_model.py', 'w', encoding='utf-8') as f:
    f.write("""
import pandas as pd
import numpy as np
import joblib
import json
import os
import matplotlib.pyplot as plt
import seaborn as sns

def load_student_data(file_path='student_data_temporal.csv'):
    '''
    Load student data from CSV file
    '''
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found.")
        return None
    
    return pd.read_csv(file_path)

def predict_student_future(student_data, models_path='models/'):
    '''
    Make comprehensive predictions about a student's future performance.
    Provides realistic predictions including improvement, decline, or stability.
    '''
    # Load models
    status_model = joblib.load(os.path.join(models_path, 'student_status_model.pkl'))
    performance_model = joblib.load(os.path.join(models_path, 'student_perf_model.pkl'))
    
    # Check if trajectory model exists
    trajectory_model_path = os.path.join(models_path, 'student_trajectory_model.pkl')
    if os.path.exists(trajectory_model_path):
        trajectory_model = joblib.load(trajectory_model_path)
        has_trajectory_model = True
    else:
        has_trajectory_model = False
    
    # Load metadata
    with open(os.path.join(models_path, 'model_metadata.json'), 'r') as f:
        metadata = json.load(f)
    
    # Prepare input data as dataframe
    if isinstance(student_data, dict):
        student_df = pd.DataFrame([student_data])
    else:
        student_df = student_data.copy()
    
    # Make predictions
    status_pred = status_model.predict(student_df)
    status_proba = status_model.predict_proba(student_df)
    
    performance_pred = performance_model.predict(student_df)
    
    # Handle single or multiple predictions
    results = []
    for i in range(len(student_df)):
        result = {
            'status': {
                'prediction': int(status_pred[i]),
                'label': metadata['status_model']['classes'][int(status_pred[i])],
                'confidence': float(status_proba[i][int(status_pred[i])]),
                'probabilities': {
                    metadata['status_model']['classes'][j]: float(prob) 
                    for j, prob in enumerate(status_proba[i])
                }
            },
            'performance': {
                'prediction': float(performance_pred[i])
            }
        }
        
        # Add trajectory prediction if model exists
        if has_trajectory_model:
            trajectory_pred = trajectory_model.predict(student_df.iloc[[i]])[0]
            trajectory_proba = trajectory_model.predict_proba(student_df.iloc[[i]])[0]
            
            trajectory_mapping = {-1: 'decline', 0: 'same', 1: 'improve'}
            trajectory_label = trajectory_mapping[trajectory_pred]
            
            result['trajectory'] = {
                'prediction': trajectory_label,
                'confidence': float(trajectory_proba[int(trajectory_pred) + 1]),  # +1 to adjust for -1, 0, 1 mapping
                'probabilities': {
                    'decline': float(trajectory_proba[0]),
                    'same': float(trajectory_proba[1]),
                    'improve': float(trajectory_proba[2])
                }
            }
            
            # Add contextual explanations based on factors
            if 'core_avg_change' in student_df.columns:
                core_change = student_df['core_avg_change'].iloc[i]
                absences_change = student_df['absence_change'].iloc[i] if 'absence_change' in student_df.columns else 0
                
                # Generate explanation based on data
                explanations = []
                
                # Academic trend explanations
                if core_change > 3:
                    explanations.append("Recent significant improvement in core subjects")
                elif core_change > 1:
                    explanations.append("Slight improvement trend in academic performance")
                elif core_change < -3:
                    explanations.append("Recent significant decline in core subjects")
                elif core_change < -1:
                    explanations.append("Slight downward trend in academic performance")
                else:
                    explanations.append("Academic performance has been relatively stable")
                
                # Attendance explanations
                if absences_change > 3:
                    explanations.append("Increasing absence pattern is concerning")
                elif absences_change < -3:
                    explanations.append("Improved attendance pattern is promising")
                
                # Subject-specific insights
                subject_cols = ['arabic', 'math', 'english', 'science']
                changes = []
                for subject in subject_cols:
                    if f'{subject}_change' in student_df.columns:
                        subject_change = student_df[f'{subject}_change'].iloc[i]
                        if abs(subject_change) > 5:
                            direction = "improvement" if subject_change > 0 else "decline"
                            changes.append((subject, direction, abs(subject_change)))
                
                # Add up to 2 most significant subject changes
                changes.sort(key=lambda x: x[2], reverse=True)
                for subject, direction, change in changes[:2]:
                    explanations.append(f"Significant {direction} in {subject} ({change:.1f} points)")
                
                result['explanations'] = explanations
        
        # Add confidence indicators
        result['confidence_level'] = 'medium' if result['status']['confidence'] < 0.7 else 'high'
        
        # Add sensible recommendations based on predictions
        status_recommendations = {
            0: [  # Fail
                "Implement immediate intervention strategies",
                "Schedule parent-teacher conference",
                "Consider additional tutoring support",
                "Create a daily study schedule"
            ],
            1: [  # Pass
                "Monitor progress closely",
                "Provide targeted support in weaker subjects",
                "Encourage consistent attendance",
                "Implement regular progress check-ins"
            ],
            2: [  # Distinction
                "Provide enrichment opportunities",
                "Consider advanced placement options",
                "Maintain current support systems",
                "Explore additional interests and talents"
            ]
        }
        
        result['recommendations'] = status_recommendations[int(status_pred[i])]
        results.append(result)
    
    # Return single result or list depending on input
    if isinstance(student_data, dict):
        return results[0]
    else:
        return results

def test_random_students(num_students=5):
    '''
    Test prediction on random students
    '''
    df = load_student_data()
    if df is None:
        return
    
    latest_semester = df['semester'].max()
    students = df[df['semester'] == latest_semester].sample(num_students)
    
    print(f"Testing predictions for {num_students} random students...")
    
    for i, (idx, student) in enumerate(students.iterrows()):
        print(f"\\n==== Student {i+1} ====")
        print(f"Current Status: {'Fail' if student['status'] == 0 else 'Pass' if student['status'] == 1 else 'Distinction'}")
        print(f"Current Overall Average: {student['overall_avg']:.2f}")
        
        # Get student history
        student_id = student['student_id']
        history = df[df['student_id'] == student_id].sort_values('semester')
        
        if len(history) > 1:
            print("Performance History:")
            for sem, data in history.iterrows():
                print(f"  Semester {data['semester']}: {data['overall_avg']:.2f} avg, {data['absent_days']} absences")
        
        # Convert to dictionary for prediction
        student_dict = student.to_dict()
        # Convert numpy types to native Python types
        student_dict = {k: v.item() if hasattr(v, 'item') else v for k, v in student_dict.items()}
        
        # Make prediction
        prediction = predict_student_future(student_dict)
        
        print("\\nPREDICTION:")
        print(f"Status: {prediction['status']['label']} (confidence: {prediction['status']['confidence']:.2f})")
        print(f"Expected Performance: {prediction['performance']['prediction']:.2f}")
        
        if 'trajectory' in prediction:
            print(f"Trajectory: {prediction['trajectory']['prediction'].upper()}")
            print(f"Probabilities: Improve: {prediction['trajectory']['probabilities']['improve']:.2f}, "
                  f"Same: {prediction['trajectory']['probabilities']['same']:.2f}, "
                  f"Decline: {prediction['trajectory']['probabilities']['decline']:.2f}")
            
        if 'explanations' in prediction:
            print("\\nReasons:")
            for explanation in prediction['explanations']:
                print(f"- {explanation}")
        
        print("\\nRecommendations:")
        for rec in prediction['recommendations']:
            print(f"- {rec}")
        
        print("\\n" + "="*50)

def plot_prediction_distributions():
    '''
    Plot the distribution of predictions to show that students can improve, decline, or stay the same
    '''
    df = load_student_data()
    if df is None:
        return
    
    latest_semester = df['semester'].max()
    sample_size = min(200, len(df[df['semester'] == latest_semester]))  # Reasonable sample size
    students = df[df['semester'] == latest_semester].sample(sample_size)
    
    # Make predictions for all students
    predictions = predict_student_future(students)
    
    # Process results
    trajectories = [p['trajectory']['prediction'] for p in predictions if 'trajectory' in p]
    trajectory_counts = {
        'improve': trajectories.count('improve'),
        'same': trajectories.count('same'),
        'decline': trajectories.count('decline')
    }
    
    # Plot trajectory distribution
    plt.figure(figsize=(10, 6))
    sns.barplot(x=list(trajectory_counts.keys()), y=list(trajectory_counts.values()))
    plt.title(f'Distribution of Predicted Trajectories (n={sample_size})')
    plt.ylabel('Number of Students')
    plt.savefig('visualizations/predicted_trajectory_distribution.png')
    plt.close()
    
    # Plot prediction differences
    current_performances = students['overall_avg'].values
    predicted_performances = [p['performance']['prediction'] for p in predictions]
    differences = np.array(predicted_performances) - current_performances
    
    plt.figure(figsize=(10, 6))
    sns.histplot(differences, kde=True, bins=20)
    plt.axvline(x=0, color='r', linestyle='--')
    plt.title('Distribution of Predicted Changes in Performance')
    plt.xlabel('Predicted Change (Current → Future)')
    plt.savefig('visualizations/predicted_performance_changes.png')
    plt.close()
    
    # Calculate statistics
    improve_pct = trajectory_counts['improve'] / len(trajectories)
    same_pct = trajectory_counts['same'] / len(trajectories)
    decline_pct = trajectory_counts['decline'] / len(trajectories)
    
    print(f"Prediction distribution for {sample_size} students:")
    print(f"- Improve: {trajectory_counts['improve']} ({improve_pct:.1%})")
    print(f"- Same: {trajectory_counts['same']} ({same_pct:.1%})")
    print(f"- Decline: {trajectory_counts['decline']} ({decline_pct:.1%})")
    print(f"Average predicted change: {np.mean(differences):.2f}")
    print("\\nVisualization saved to 'visualizations/predicted_trajectory_distribution.png'")

if __name__ == "__main__":
    # Test the system with some examples
    print("\\n===== STUDENT PERFORMANCE PREDICTION SYSTEM =====")
    print("1. Testing random students...")
    test_random_students(3)
    
    print("\\n2. Analyzing overall prediction distributions...")
    plot_prediction_distributions()
""")

print("\n✅ Created test script for model predictions.")
print("To test the model on random students, run: python test_model.py")

def demonstrate_varied_predictions():
    """
    Create a demonstration to explicitly show that our system can predict
    improvement, stability, or decline in student performance.
    """
    latest_semester = df['semester'].max()
    students_df = df[df['semester'] == latest_semester]
    
    if 'trajectory' in students_df.columns:
        improvers = students_df[students_df['trajectory'] == 'improve'].sample(min(3, sum(students_df['trajectory'] == 'improve')))
        stable = students_df[students_df['trajectory'] == 'same'].sample(min(3, sum(students_df['trajectory'] == 'same')))
        decliners = students_df[students_df['trajectory'] == 'decline'].sample(min(3, sum(students_df['trajectory'] == 'decline')))
        
        test_students = pd.concat([improvers, stable, decliners])
    else:

        high_perf = students_df[(students_df['overall_avg'] > 75) & (students_df['absent_days'] < 5)].sample(min(3, len(students_df[(students_df['overall_avg'] > 75) & (students_df['absent_days'] < 5)])))
        
        avg_perf = students_df[(students_df['overall_avg'].between(50, 74)) & (students_df['absent_days'].between(5, 10))].sample(min(3, len(students_df[(students_df['overall_avg'].between(50, 74)) & (students_df['absent_days'].between(5, 10))])))
        
        low_perf = students_df[(students_df['overall_avg'] < 50) & (students_df['absent_days'] > 10)].sample(min(3, len(students_df[(students_df['overall_avg'] < 50) & (students_df['absent_days'] > 10)])))
        
        test_students = pd.concat([high_perf, avg_perf, low_perf])
    
    print("\n==== DEMONSTRATING VARIED PREDICTION OUTCOMES ====")
    
    for i, (idx, student) in enumerate(test_students.iterrows()):
        print(f"\n---- Student {i+1} ----")
        print(f"Current Status: {'Fail' if student['status'] == 0 else 'Pass' if student['status'] == 1 else 'Distinction'}")
        print(f"Current Overall Average: {student['overall_avg']:.2f}")
        print(f"Absent Days: {student['absent_days']}")
        
        student_id = student['student_id']
        history = df[df['student_id'] == student_id].sort_values('semester')
        
        if len(history) > 1:
            print("Performance History:")
            for sem, data in history.iterrows():
                print(f"  Semester {data['semester']}: {data['overall_avg']:.2f} avg, {data['absent_days']} absences")
                if 'trajectory' in data and not pd.isna(data['trajectory']):
                    print(f"    Trend: {data['trajectory']}")
        
        student_dict = {k: v.item() if hasattr(v, 'item') else v for k, v in student.to_dict().items()}
        prediction = predict_student_future(student_dict)
        
        print("\nPREDICTION:")
        print(f"Status: {prediction['status']['label']} (confidence: {prediction['status']['confidence']:.2f})")
        print(f"Expected Performance: {prediction['performance']['prediction']:.2f}")
        
        if 'trajectory' in prediction:
            print(f"Trajectory: {prediction['trajectory']['prediction'].upper()}")
            print(f"Probabilities - Improve: {prediction['trajectory']['probabilities']['improve']:.2f}, "
                  f"Same: {prediction['trajectory']['probabilities']['same']:.2f}, "
                  f"Decline: {prediction['trajectory']['probabilities']['decline']:.2f}")
            
        if 'explanations' in prediction:
            print("\nExplanations:")
            for explanation in prediction['explanations']:
                print(f"- {explanation}")
        
        print("\nRecommendations:")
        for rec in prediction['recommendations']:
            print(f"- {rec}")
            
        perf_difference = prediction['performance']['prediction'] - student['overall_avg']
        print(f"\nPredicted Change: {perf_difference:.2f} points ({perf_difference:.1%} change)")
    
    print("\n✅ Demonstration complete!")

demonstrate_varied_predictions()