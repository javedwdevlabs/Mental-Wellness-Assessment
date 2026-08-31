import { useState } from "react";
import {
  FiUser,
  FiGlobe,
  FiBookOpen,
  FiSmartphone,
  FiActivity,
  FiMoon,
  FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PredictionForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    country: "",
    academic_level: "",
    most_used_platform: "",
    purpose_of_use: "",
    avg_daily_usage_hours: "",
    daily_unlocks: "",
    study_hours: "",
    physical_activity_hours: "",
    sleep_hours_per_night: "",
    stress_level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear individual field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Frontend Validation matching Backend Pydantic Schema
  const validateForm = () => {
    const errors = {};

    // 1. Age: int (ge=10, le=100)
    if (!formData.age) {
      errors.age = "Age is required.";
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || !Number.isInteger(ageNum)) {
        errors.age = "Age must be a whole number.";
      } else if (ageNum < 10 || ageNum > 100) {
        errors.age = "Age must be between 10 and 100.";
      }
    }

    // 2. Gender: Literal["Male", "Female"]
    if (!formData.gender) {
      errors.gender = "Please select a gender.";
    }

    // 3. Country: str (min_length=2, max_length=100)
    if (!formData.country.trim()) {
      errors.country = "Country is required.";
    } else if (formData.country.trim().length < 2) {
      errors.country = "Country name must be at least 2 characters.";
    } else if (formData.country.trim().length > 100) {
      errors.country = "Country name cannot exceed 100 characters.";
    }

    // 4. Academic Level
    if (!formData.academic_level) {
      errors.academic_level = "Please select academic level.";
    }

    // 5. Most Used Platform
    if (!formData.most_used_platform) {
      errors.most_used_platform = "Please select most used platform.";
    }

    // 6. Purpose of Use
    if (!formData.purpose_of_use) {
      errors.purpose_of_use = "Please select primary purpose of use.";
    }

    // 7. Avg Daily Usage Hours: float (ge=0, le=24)
    if (formData.avg_daily_usage_hours === "") {
      errors.avg_daily_usage_hours = "Daily usage hours is required.";
    } else {
      const hours = Number(formData.avg_daily_usage_hours);
      if (isNaN(hours) || hours < 0 || hours > 24) {
        errors.avg_daily_usage_hours = "Hours must be between 0 and 24.";
      }
    }

    // 8. Daily Unlocks: int (ge=0)
    if (formData.daily_unlocks === "") {
      errors.daily_unlocks = "Daily unlocks count is required.";
    } else {
      const unlocks = Number(formData.daily_unlocks);
      if (isNaN(unlocks) || !Number.isInteger(unlocks) || unlocks < 0) {
        errors.daily_unlocks = "Unlocks must be a valid non-negative number.";
      }
    }

    // 9. Study Hours: float (ge=0, le=24)
    if (formData.study_hours === "") {
      errors.study_hours = "Study hours is required.";
    } else {
      const study = Number(formData.study_hours);
      if (isNaN(study) || study < 0 || study > 24) {
        errors.study_hours = "Hours must be between 0 and 24.";
      }
    }

    // 10. Physical Activity Hours: float (ge=0, le=24)
    if (formData.physical_activity_hours === "") {
      errors.physical_activity_hours = "Physical activity hours is required.";
    } else {
      const activity = Number(formData.physical_activity_hours);
      if (isNaN(activity) || activity < 0 || activity > 24) {
        errors.physical_activity_hours = "Hours must be between 0 and 24.";
      }
    }

    // 11. Sleep Hours Per Night: float (ge=0, le=24)
    if (formData.sleep_hours_per_night === "") {
      errors.sleep_hours_per_night = "Sleep hours is required.";
    } else {
      const sleep = Number(formData.sleep_hours_per_night);
      if (isNaN(sleep) || sleep < 0 || sleep > 24) {
        errors.sleep_hours_per_night = "Hours must be between 0 and 24.";
      }
    }

    // 12. Stress Level
    if (!formData.stress_level) {
      errors.stress_level = "Please select stress level.";
    }

    return errors;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Client-side validation check
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please resolve all validation errors before submitting.");
      return;
    }

    setLoading(true);

    // Format Data to match Backend types (Strings -> Int / Float)
    const payload = {
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      country: formData.country.trim(),
      academic_level: formData.academic_level,
      most_used_platform: formData.most_used_platform,
      purpose_of_use: formData.purpose_of_use,
      avg_daily_usage_hours: parseFloat(formData.avg_daily_usage_hours),
      daily_unlocks: parseInt(formData.daily_unlocks, 10),
      study_hours: parseFloat(formData.study_hours),
      physical_activity_hours: parseFloat(formData.physical_activity_hours),
      sleep_hours_per_night: parseFloat(formData.sleep_hours_per_night),
      stress_level: formData.stress_level,
    };

    try {
      const response = await fetch(
        "https://mental-wellness-assessment.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Validation Error:", errorData);
        setError(
          errorData?.detail?.[0]?.msg ||
            "Please check your information and try again."
        );
        return;
      }

      const result = await response.json();

      navigate("/prediction", {
        state: { result },
      });
    } catch (err) {
      console.error("Server Error:", err);
      setError(
        "We couldn't connect to our server right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 lg:px-10 py-7 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-green-100 text-green-900 flex items-center justify-center">
              <FiActivity size={21} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Mental Wellness Assessment
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Tell us about your lifestyle and daily habits.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 sm:p-8 lg:p-10">
            {/* ================= PERSONAL INFORMATION ================= */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-green-950 text-white flex items-center justify-center text-xs font-bold">
                  01
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Personal Information
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Basic information about you
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Age */}
                <div>
                  <label className="field-label">Age (10 - 100)</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      className={`form-input ${
                        fieldErrors.age ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {fieldErrors.age && (
                    <span className="error-text">{fieldErrors.age}</span>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="field-label">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`form-input ${
                      fieldErrors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {fieldErrors.gender && (
                    <span className="error-text">{fieldErrors.gender}</span>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="field-label">Country</label>
                  <div className="input-wrapper">
                    <FiGlobe className="input-icon" />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. India"
                      className={`form-input ${
                        fieldErrors.country ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {fieldErrors.country && (
                    <span className="error-text">{fieldErrors.country}</span>
                  )}
                </div>
              </div>
            </div>

            {/* ================= ACADEMIC & DIGITAL ================= */}
            <div className="mb-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-green-950 text-white flex items-center justify-center text-xs font-bold">
                  02
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Academic & Digital Habits
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Your study and social media usage
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Academic Level */}
                <div>
                  <label className="field-label">Academic Level</label>
                  <div className="input-wrapper">
                    <FiBookOpen className="input-icon" />
                    <select
                      name="academic_level"
                      value={formData.academic_level}
                      onChange={handleChange}
                      className={`form-input ${
                        fieldErrors.academic_level ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Academic Level</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  {fieldErrors.academic_level && (
                    <span className="error-text">
                      {fieldErrors.academic_level}
                    </span>
                  )}
                </div>

                {/* Platform */}
                <div>
                  <label className="field-label">Most Used Platform</label>
                  <div className="input-wrapper">
                    <FiSmartphone className="input-icon" />
                    <select
                      name="most_used_platform"
                      value={formData.most_used_platform}
                      onChange={handleChange}
                      className={`form-input ${
                        fieldErrors.most_used_platform ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Platform</option>
                      <option value="Facebook">Facebook</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Snapchat">Snapchat</option>
                      <option value="Twitter">Twitter</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LINE">LINE</option>
                      <option value="KakaoTalk">KakaoTalk</option>
                      <option value="VKontakte">VKontakte</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="WeChat">WeChat</option>
                    </select>
                  </div>
                  {fieldErrors.most_used_platform && (
                    <span className="error-text">
                      {fieldErrors.most_used_platform}
                    </span>
                  )}
                </div>

                {/* Purpose */}
                <div>
                  <label className="field-label">Primary Purpose of Use</label>
                  <select
                    name="purpose_of_use"
                    value={formData.purpose_of_use}
                    onChange={handleChange}
                    className={`form-input ${
                      fieldErrors.purpose_of_use ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Purpose</option>
                    <option value="Networking">Networking</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="News">News</option>
                  </select>
                  {fieldErrors.purpose_of_use && (
                    <span className="error-text">
                      {fieldErrors.purpose_of_use}
                    </span>
                  )}
                </div>

                {/* Daily Usage */}
                <div>
                  <label className="field-label">Average Daily Usage (0 - 24 Hours)</label>
                  <div className="input-wrapper">
                    <FiSmartphone className="input-icon" />
                    <input
                      type="number"
                      step="0.1"
                      name="avg_daily_usage_hours"
                      value={formData.avg_daily_usage_hours}
                      onChange={handleChange}
                      placeholder="e.g. 4.5"
                      className={`form-input pr-16 ${
                        fieldErrors.avg_daily_usage_hours ? "border-red-500" : ""
                      }`}
                    />
                    <span className="input-unit">hours</span>
                  </div>
                  {fieldErrors.avg_daily_usage_hours && (
                    <span className="error-text">
                      {fieldErrors.avg_daily_usage_hours}
                    </span>
                  )}
                </div>

                {/* Daily Unlocks */}
                <div>
                  <label className="field-label">Daily Phone Unlocks</label>
                  <div className="input-wrapper">
                    <FiZap className="input-icon" />
                    <input
                      type="number"
                      name="daily_unlocks"
                      value={formData.daily_unlocks}
                      onChange={handleChange}
                      placeholder="e.g. 50"
                      className={`form-input ${
                        fieldErrors.daily_unlocks ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {fieldErrors.daily_unlocks && (
                    <span className="error-text">
                      {fieldErrors.daily_unlocks}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ================= LIFESTYLE ================= */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-green-950 text-white flex items-center justify-center text-xs font-bold">
                  03
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Lifestyle & Well-being
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Your daily physical and mental habits
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Study */}
                <div>
                  <label className="field-label">Study Hours / Day (0 - 24 Hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="study_hours"
                    value={formData.study_hours}
                    onChange={handleChange}
                    placeholder="e.g. 8"
                    className={`form-input ${
                      fieldErrors.study_hours ? "border-red-500" : ""
                    }`}
                  />
                  {fieldErrors.study_hours && (
                    <span className="error-text">{fieldErrors.study_hours}</span>
                  )}
                </div>

                {/* Physical Activity */}
                <div>
                  <label className="field-label">Physical Activity / Day (0 - 24 Hours)</label>
                  <div className="input-wrapper">
                    <FiActivity className="input-icon" />
                    <input
                      type="number"
                      step="0.1"
                      name="physical_activity_hours"
                      value={formData.physical_activity_hours}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      className={`form-input ${
                        fieldErrors.physical_activity_hours ? "border-red-500" : ""
                      }`}
                    />
                    <span className="input-unit">hours</span>
                  </div>
                  {fieldErrors.physical_activity_hours && (
                    <span className="error-text">
                      {fieldErrors.physical_activity_hours}
                    </span>
                  )}
                </div>

                {/* Sleep */}
                <div>
                  <label className="field-label">Sleep / Night (0 - 24 Hours)</label>
                  <div className="input-wrapper">
                    <FiMoon className="input-icon" />
                    <input
                      type="number"
                      step="0.1"
                      name="sleep_hours_per_night"
                      value={formData.sleep_hours_per_night}
                      onChange={handleChange}
                      placeholder="e.g. 5"
                      className={`form-input ${
                        fieldErrors.sleep_hours_per_night ? "border-red-500" : ""
                      }`}
                    />
                    <span className="input-unit">hours</span>
                  </div>
                  {fieldErrors.sleep_hours_per_night && (
                    <span className="error-text">
                      {fieldErrors.sleep_hours_per_night}
                    </span>
                  )}
                </div>

                {/* Stress Level */}
                <div className="md:col-span-3">
                  <label className="field-label">Perceived Stress Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {["Low", "Medium", "High", "Very High"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            stress_level: level,
                          }));
                          if (fieldErrors.stress_level) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              stress_level: "",
                            }));
                          }
                        }}
                        className={`h-11 rounded-xl border text-sm font-medium transition ${
                          formData.stress_level === level
                            ? "bg-green-950 border-green-950 text-white"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-300"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.stress_level && (
                    <span className="error-text">{fieldErrors.stress_level}</span>
                  )}
                </div>
              </div>
            </div>

            {/* ================= ACTION ================= */}
            <div className="mt-10 pt-7 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-xs text-gray-400 text-center sm:text-left">
                Your information is used only to generate the predicted score.
              </p>

              {error && (
                <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-8 h-12 rounded-xl bg-green-950 hover:bg-green-900 text-white text-sm font-semibold transition shrink-0"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze My Wellness →"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Component-level styles */}
      <style>
        {`
          .field-label {
            display: block;
            margin-bottom: 8px;
            font-size: 12px;
            font-weight: 600;
            color: #4b5d56;
          }

          .form-input {
            width: 100%;
            height: 45px;
            padding: 0 13px;
            border: 1px solid #e5e9e7;
            border-radius: 10px;
            background: #f8faf9;
            color: #40514b;
            font-size: 13px;
            outline: none;
          }

          .form-input:focus {
            border-color: #527f70;
            background: #ffffff;
          }

          .input-wrapper {
            position: relative;
          }

          .input-icon {
            position: absolute;
            left: 13px;
            top: 50%;
            transform: translateY(-50%);
            color: #82928b;
            pointer-events: none;
          }

          .input-wrapper .form-input {
            padding-left: 40px;
          }

          .input-unit {
            position: absolute;
            right: 13px;
            top: 50%;
            transform: translateY(-50%);
            color: #9aa6a1;
            font-size: 11px;
            pointer-events: none;
          }

          .error-text {
            display: block;
            margin-top: 4px;
            font-size: 11px;
            color: #ef4444;
          }
        `}
      </style>
    </section>
  );
}

export default PredictionForm;