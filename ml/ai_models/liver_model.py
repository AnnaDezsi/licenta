import os
import joblib
import pandas as pd

class LiverDiseaseModel:
    def __init__(self):
        self.name = "Boala de ficat"
        self.model_path = "ai_models/resources/liver_disease_model.joblib"
        self.scaler_path = "ai_models/resources/liver_disease_scaler.joblib"
        self.model = None
        self.scaler = None

        self.features = [
            "Age", "Gender", "Total_Bilirubin", "Direct_Bilirubin",
            "Alkaline_Phosphotase", "Alamine_Aminotransferase",
            "Aspartate_Aminotransferase", "Total_Protiens",
            "Albumin", "Albumin_and_Globulin_Ratio"
        ]

    def load(self):
        if os.path.exists(self.model_path) and os.path.exists(self.scaler_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
        else:
            raise FileNotFoundError("Missing liver disease model or scaler")

    def prepare_input(self, input_data: dict):
        """Filter and preprocess incoming input for prediction."""
        clean_data = {}
        for key in self.features:
            if key not in input_data:
                raise ValueError(f"Missing required feature: {key}")

            if key == "Gender":
                gender_val = input_data["Gender"]
                if str(gender_val).lower() in ["female", "f", "0"]:
                    clean_data["Gender"] = 0
                elif str(gender_val).lower() in ["male", "m", "1"]:
                    clean_data["Gender"] = 1
                else:
                    raise ValueError(f"Invalid gender value: {gender_val}")
            else:
                clean_data[key] = input_data[key]

        return pd.DataFrame([clean_data])

    def predict(self, input_data: dict) -> dict:
        if self.model is None or self.scaler is None:
            raise ValueError("Model or scaler not loaded.")

        try:
            df = self.prepare_input(input_data)
            scaled = self.scaler.transform(df)
            prediction = self.model.predict(scaled)[0]
            return {
                "disease": self.name,
                "prediction": bool(prediction)
            }
        except Exception as e:
            return {"error": str(e)}
