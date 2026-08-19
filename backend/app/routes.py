from fastapi import APIRouter,HTTPException
import time

from app.schemas import UserData, PredictionResponse
from app.services import (
    predict_mental_health,
    get_mental_health_assessment,
)


router = APIRouter()


@router.get("/")
def greet():
    return {"message": "Welcome..."}


@router.post("/predict", response_model=PredictionResponse)
def predict(data: UserData):

    start_time = time.perf_counter()

    try:
        score = predict_mental_health(data)

        category, summary = get_mental_health_assessment(score)

         
        print(
            f"Prediction time: {time.perf_counter() - start_time:.4f} seconds"
        )

        return PredictionResponse(
            predicted_mental_health_score=score,
            stress_category=category,
            condition_summary=summary,
        )

    except Exception as e:
        print(f"Prediction Error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Prediction service is temporarily unavailable."
        )