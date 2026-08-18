from fastapi import APIRouter

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

    score = predict_mental_health(data)

    category, summary = get_mental_health_assessment(score)

    return PredictionResponse(
        predicted_mental_health_score=score,
        stress_category=category,
        condition_summary=summary,
    )