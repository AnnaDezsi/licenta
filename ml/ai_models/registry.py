from ai_models.diabetes_model import DiabetesModel
from ai_models.liver_model import LiverDiseaseModel
from ai_models.breast_cancer_model import BreastCancerModel

def load_models():
    models = []

    diabetes = DiabetesModel()
    diabetes.load()
    models.append(diabetes)

    liver = LiverDiseaseModel()
    liver.load()
    models.append(liver)

    breast = BreastCancerModel()
    breast.load()
    models.append(breast)

    return models

model_registry = load_models()
