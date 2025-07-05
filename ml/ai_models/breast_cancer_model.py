import joblib
import pandas as pd

class BreastCancerModel:
    def __init__(self):
        self.name = "Cancer mamar"
        self.model_path = "ai_models/resources/breast_cancer_model.joblib"
        self.scaler_path = "ai_models/resources/breast_cancer_scaler.joblib"
        self.model = None
        self.scaler = None

        # Feature list from the training dataset (data.csv)
        self.features = [
            "radius_mean",
            "texture_mean",
            "perimeter_mean",
            "area_mean",
            "smoothness_mean",
            "compactness_mean",
            "concavity_mean",
            "concave points_mean"  # keep exact name with space
        ]

    def load(self):
        self.model = joblib.load(self.model_path)
        self.scaler = joblib.load(self.scaler_path)

    def predict(self, input_data: dict):
        missing = [f for f in self.features if f not in input_data]
        if missing:
            raise ValueError(f"Missing required features: {', '.join(missing)}")

        df = pd.DataFrame([input_data], columns=self.features)
        scaled = self.scaler.transform(df)
        prediction = self.model.predict(scaled)[0]

        return {
            "disease": self.name,
            "prediction": bool(prediction)
        }
