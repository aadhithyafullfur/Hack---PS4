#!/usr/bin/env python3
"""
Script to predict conversion probability using logistic regression model
"""

import sys
import json
import pickle
import numpy as np
from pathlib import Path

def load_model(model_path):
    """Load the trained model from pickle file"""
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}", file=sys.stderr)
        return None

def predict_conversion_probability(features_list, model_path=None):
    """
    Predict conversion probability for a list of feature sets
    
    Args:
        features_list: List of dictionaries containing features
        model_path: Path to the model file (defaults to conversion_model.pkl)
    
    Returns:
        List of conversion probabilities
    """
    if model_path is None:
        # Construct the path to the pkl directory - go up two levels from utils to backend, then to pkl
        script_dir = Path(__file__).parent
        backend_dir = script_dir.parent
        pkl_dir = backend_dir.parent / "pkl"
        model_path = pkl_dir / "conversion_model.pkl"
        
        # Check if the specific conversion model exists, if not try alternatives
        if not model_path.exists():
            # Try alternative models
            alt_models = [
                pkl_dir / "rf_conversion_model.pkl",
                pkl_dir / "xgboost_model.pkl"
            ]
            
            for alt_path in alt_models:
                if alt_path.exists():
                    model_path = alt_path
                    print(f"Using alternative model: {model_path}", file=sys.stderr)
                    break
            else:
                # If no models exist, return default values
                print(f"No model files found in {pkl_dir}", file=sys.stderr)
                return [0.1 for _ in features_list]
    
    # Load the model
    model = load_model(model_path)
    if model is None:
        # If the specific logistic regression model doesn't exist, 
        # try to create a basic one from the other models or use a default
        # For now, let's try the other models as fallbacks
        alt_models = [
            Path(__file__).parent.parent / "pkl" / "rf_conversion_model.pkl",
            Path(__file__).parent.parent / "pkl" / "xgboost_model.pkl"
        ]
        
        for alt_model_path in alt_models:
            if alt_model_path.exists():
                model = load_model(alt_model_path)
                if model is not None:
                    break
        
        if model is None:
            # If no models are available, return default values
            return [0.1 for _ in features_list]  # Default to 10% conversion rate
    
    # Prepare features for prediction
    # The features expected by the model are:
    # emailEngagement, visitFrequency, pricingInterest, demoInterest
    feature_columns = []
    
    for features in features_list:
        # Extract features in the correct order expected by the model
        feature_vector = [
            features.get('emailEngagement', 0),
            features.get('visitFrequency', 0),
            features.get('pricingInterest', 0),
            features.get('demoInterest', 0)
        ]
        feature_columns.append(feature_vector)
    
    # Convert to numpy array
    X = np.array(feature_columns)
    
    # Make predictions
    try:
        # Get prediction probabilities (assuming binary classification)
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(X)
            # For binary classification, take the probability of positive class (index 1)
            conversion_probs = [prob[1] if len(prob) > 1 else prob[0] for prob in probabilities]
        elif hasattr(model, 'decision_function'):
            # If only decision function is available, convert to probabilities with sigmoid
            scores = model.decision_function(X)
            # Apply sigmoid function
            import math
            conversion_probs = [1 / (1 + math.exp(-score)) for score in scores]
        else:
            # If only predict is available, return default values
            predictions = model.predict(X)
            # Convert binary predictions to probabilities
            conversion_probs = [0.8 if pred == 1 else 0.2 for pred in predictions]
        
        return conversion_probs
    except Exception as e:
        print(f"Error making predictions: {str(e)}", file=sys.stderr)
        # Return default probabilities
        return [0.1 for _ in features_list]

def main():
    """Main function to run the prediction from command line"""
    if len(sys.argv) < 2:
        print("Usage: python predict_conversion.py '<json_features>'", file=sys.stderr)
        sys.exit(1)
    
    try:
        # Parse input JSON
        input_data = json.loads(sys.argv[1])
        
        # Handle both single feature set and list of feature sets
        if isinstance(input_data, dict):
            features_list = [input_data]
        elif isinstance(input_data, list):
            features_list = input_data
        else:
            raise ValueError("Input must be a JSON object or array of objects")
        
        # Get predictions
        probabilities = predict_conversion_probability(features_list)
        
        # Output results as JSON
        output = {
            "success": True,
            "predictions": probabilities
        }
        
        print(json.dumps(output))
        
    except json.JSONDecodeError as e:
        error_output = {
            "success": False,
            "error": f"Invalid JSON input: {str(e)}"
        }
        print(json.dumps(error_output))
        sys.exit(1)
    except Exception as e:
        error_output = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_output))
        sys.exit(1)

if __name__ == "__main__":
    main()