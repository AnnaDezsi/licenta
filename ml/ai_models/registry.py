from ai_models.liver_model import LiverDiseaseModel
from ai_models.breast_cancer_model import BreastCancerModel

def load_models():
    models = []

    liver = LiverDiseaseModel()
    liver.load()
    models.append(liver)

    breast = BreastCancerModel()
    breast.load()
    models.append(breast)

    return models

model_registry = load_models()
