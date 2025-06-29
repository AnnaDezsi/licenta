from ai_models.diabetes_model import DiabetesModel
# from ai_models.thyroid_model import ThyroidModel

def load_models():
    models = []

    diabetes = DiabetesModel()
    diabetes.load()
    models.append(diabetes)

    # thyroid = ThyroidModel()
    # thyroid.load()
    # models.append(thyroid)

    return models

model_registry = load_models()
