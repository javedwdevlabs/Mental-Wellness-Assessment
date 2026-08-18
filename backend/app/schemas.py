from enum import Enum

# from pydantic import BaseModel, ConfigDict, Field, field_validator
from pydantic import BaseModel, ConfigDict, Field, ValidationInfo, field_validator

from typing import Literal

# ============================================================
# ENUM DEFINITIONS
# ============================================================

class GenderEnum(str, Enum):
    MALE = "Male"
    FEMALE = "Female"


class AcademicLevelEnum(str, Enum):
    UNDERGRADUATE = "Undergraduate"
    GRADUATE = "Graduate"
    HIGH_SCHOOL = "High School"


class PlatformEnum(str, Enum):
    FACEBOOK = "Facebook"
    LINKEDIN = "LinkedIn"
    INSTAGRAM = "Instagram"
    SNAPCHAT = "Snapchat"
    TWITTER = "Twitter"
    YOUTUBE = "YouTube"
    TIKTOK = "TikTok"
    LINE = "LINE"
    KAKAOTALK = "KakaoTalk"
    VKONTAKTE = "VKontakte"
    WHATSAPP = "WhatsApp"
    WECHAT = "WeChat"


class PurposeEnum(str, Enum):
    NETWORKING = "Networking"
    EDUCATION = "Education"
    ENTERTAINMENT = "Entertainment"
    NEWS = "News"


class StressLevelEnum(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    VERY_HIGH = "Very High"

# ============================================================
# REQUEST SCHEMA
# ============================================================

class UserData(BaseModel):
    """
    Request schema for the mental health score prediction API.

    Validates and normalizes user-provided features before
    they are passed to the machine learning pipeline.
    """

    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )

    age: int = Field(
        ...,
        ge=10,
        le=100,
        description="User's age in years.",
        examples=[25],
    )

    gender: Literal["Male", "Female"] = Field(
        ...,
        description="User's gender.",
        examples=["Male"],
    )

    country: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="User's country.",
        examples=["India"],
    )

    academic_level: Literal[
        "Undergraduate",
        "Graduate",
        "High School",
    ] = Field(
        ...,
        description="User's current academic level.",
        examples=["Undergraduate"],
    )

    most_used_platform: Literal[
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat",
    ] = Field(
        ...,
        description="Social media platform used most frequently.",
        examples=["Instagram"],
    )

    purpose_of_use: Literal[
        "Networking",
        "Education",
        "Entertainment",
        "News",
    ] = Field(
        ...,
        description="Primary purpose of social media usage.",
        examples=["Entertainment"],
    )

    avg_daily_usage_hours: float = Field(
        ...,
        ge=0,
        le=24,
        description="Average number of hours spent on social media per day.",
        examples=[4.5],
    )

    daily_unlocks: int = Field(
        ...,
        ge=0,
        description="Number of times the user unlocks their device per day.",
        examples=[35],
    )

    study_hours: float = Field(
        ...,
        ge=0,
        le=24,
        description="Average number of hours spent studying per day.",
        examples=[5.0],
    )

    physical_activity_hours: float = Field(
        ...,
        ge=0,
        le=24,
        description="Average number of hours spent on physical activity per day.",
        examples=[1.5],
    )

    sleep_hours_per_night: float = Field(
        ...,
        ge=0,
        le=24,
        description="Average number of hours slept per night.",
        examples=[7.5],
    )

    stress_level: Literal[
        "Low",
        "Medium",
        "High",
        "Very High",
    ] = Field(
        ...,
        description="Self-reported stress level.",
        examples=["Medium"],
    )

@field_validator(
    "gender",
    "academic_level",
    "most_used_platform",
    "purpose_of_use",
    "stress_level",
    "country",
    mode="before",
)
@classmethod
def normalize_case(
    cls,
    value: str,
    info: ValidationInfo,
) -> str:

    if not isinstance(value, str):
        return value

    clean_value = value.strip().lower()

    mappings = {
        "gender": {
            item.value.lower(): item.value
            for item in GenderEnum
        },
        "academic_level": {
            item.value.lower(): item.value
            for item in AcademicLevelEnum
        },
        "most_used_platform": {
            item.value.lower(): item.value
            for item in PlatformEnum
        },
        "purpose_of_use": {
            item.value.lower(): item.value
            for item in PurposeEnum
        },
        "stress_level": {
            item.value.lower(): item.value
            for item in StressLevelEnum
        },
    }

    # Get the name of the field currently being validated.
    field_name = info.field_name

    # Country requires different normalization logic.
    if field_name == "country":
        country_mapping = {
            "usa": "USA",
            "uk": "UK",
            "uae": "UAE",
        }

        if clean_value in country_mapping:
            return country_mapping[clean_value]

        return value.strip().title()

    # Get only the mapping belonging to the current field.
    mapping = mappings[field_name]

    if clean_value in mapping:
        return mapping[clean_value]

    return value.strip()

# ============================================================
# RESPONSE SCHEMA
# ============================================================

class PredictionResponse(BaseModel):
    """Response schema returned by the prediction API."""

    predicted_mental_health_score: float = Field(
        ...,
        description="Predicted mental health score rounded to 2 decimal places.",
        examples=[7.42],
    )

    stress_category: str = Field(
        ...,
        description="Categorical assessment of mental health.",
        examples=["Moderate Well-being"],
    )

    condition_summary: str = Field(
        ...,
        description="Summary of the predicted mental health condition.",
        examples=[
            "Individual displays average mental well-being."
        ],
    )