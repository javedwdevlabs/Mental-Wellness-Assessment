import pandas as pd


from app.constants import TOP_COUNTRIES
from app.model import model


def predict_mental_health(data):
    country_group = (
        data.country
        if data.country in TOP_COUNTRIES
        else "Other"
    )

    input_row = pd.DataFrame([{
        "Age": data.age,
        "Gender": data.gender,
        "Country": data.country,
        "Academic_Level": data.academic_level,
        "Most_Used_Platform": data.most_used_platform,
        "Purpose_Of_Use": data.purpose_of_use,
        "Avg_Daily_Usage_Hours": data.avg_daily_usage_hours,
        "Daily_Unlocks": data.daily_unlocks,
        "Study_Hours": data.study_hours,
        "Physical_Activity_Hours": data.physical_activity_hours,
        "Sleep_Hours_Per_Night": data.sleep_hours_per_night,
        "Stress_Level": data.stress_level,
        "Grouped_Country": country_group,
    }])

    raw_prediction = model.predict(input_row)[0]

    return round(float(raw_prediction), 2)


def get_mental_health_assessment(score: float) -> tuple[str, str]:

    if score >= 7.5:
        category = "Higher Well-being"
        summary = (
            "The predicted score indicates relatively higher well-being "
            "based on the lifestyle patterns provided."
        )

    elif score >= 5.5:
        category = "Moderate Well-being"
        summary = (
            "The predicted score indicates moderate well-being based on "
            "the lifestyle patterns provided."
        )

    else:
        category = "Lower Well-being"
        summary = (
            "The predicted score indicates relatively lower well-being "
            "based on the lifestyle patterns provided."
        )

    return category, summary