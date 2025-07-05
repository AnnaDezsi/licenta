import os
import joblib
import pandas as pd

class DiabetesModel:
    def __init__(self):
        self.name = "Diabet"
        self.model_path = "ai_models/resources/diabetes_model.joblib"
        self.scaler_path = "ai_models/resources/diabetes_scaler.joblib"
        self.model = None
        self.scaler = None

        self.features = [
            "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
            "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
        ]

    def load(self):
        if os.path.exists(self.model_path) and os.path.exists(self.scaler_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
        else:
            raise FileNotFoundError("Missing diabetes model or scaler")

    def predict(self, input_data: dict):
        missing = [f for f in self.features if f not in input_data]
        if missing:
            raise ValueError(f"Missing required features: {', '.join(missing)}")

        df = pd.DataFrame([input_data], columns=self.features)
        scaled = self.scaler.transform(df)
        prediction = self.model.predict(scaled)[0]
        return {
            "disease": this.name,
            "prediction": bool(prediction)
        }
