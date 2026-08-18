from pathlib import Path

import joblib


# ------------------------------------------------------------
# Model artifact path
# ------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "Mental_Health_Model.pkl"


# ------------------------------------------------------------
# Load trained ML model
# ------------------------------------------------------------

model = joblib.load(MODEL_PATH)