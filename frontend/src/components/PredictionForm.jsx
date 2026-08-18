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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PredictionForm() {
    const navigate = useNavigate();
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

    const handleChange = (e)=>{
        const {name, value } = e.target
        setFormData((prev)=>({
            ...prev, [name]:value 
        }))
    }

// submit data 
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    // console.log("API Response:", result);
    navigate("/prediction", {
  state: {
    result,
  },
});

  } catch (error) {
    console.error("API Error:", error);
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
                <label className="field-label">
                  Age
                </label>

                <div className="input-wrapper">
                  <FiUser className="input-icon" />

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 25"
                    className="form-input"
                  />
                </div>
              </div>


              {/* Gender */}
              <div>
                <label className="field-label">
                  Gender
                </label>

                <select
                  defaultValue="Male"
                  className="form-input"
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>


              {/* Country */}
              <div>
                <label className="field-label">
                  Country
                </label>

                <div className="input-wrapper">
                  <FiGlobe className="input-icon" />

                  <input
                    type="text"
                    value="India"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. India"
                    className="form-input pl-10"
                  />
                </div>
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
                <label className="field-label">
                  Academic Level
                </label>

                <div className="input-wrapper">
                  <FiBookOpen className="input-icon" />

                  <select
                    name="academic_level"
                    value={formData.academic_level}
                    onChange={handleChange}
                    defaultValue="Undergraduate"
                    className="form-input pl-10"
                  >
                    <option value="">Select Academic Level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>


              {/* Platform */}
              <div>
                <label className="field-label">
                  Most Used Platform
                </label>

                <div className="input-wrapper">
                  <FiSmartphone className="input-icon" />

                  <select
                   name="most_used_platform"
                   value={formData.most_used_platform}
                   onChange={handleChange}
                    defaultValue="Instagram"
                    className="form-input pl-10"
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
              </div>


              {/* Purpose */}
              <div>
                <label className="field-label">
                  Primary Purpose of Use
                </label>

                <select
                  name="purpose_of_use"
                  value={formData.purpose_of_use}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Niche</option>
                  <option value="Networking">Networking</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="News">News</option>
                </select>
              </div>


              {/* Daily Usage */}
              <div>
                <label className="field-label">
                  Average Daily Usage
                </label>

                <div className="input-wrapper">
                  <FiSmartphone className="input-icon" />

                  <input
                    type="number"
                    name="avg_daily_usage_hours"
                    value={formData.avg_daily_usage_hours}
                    onChange={handleChange}
                    placeholder="e.g. 4.5"
                    className="form-input pl-10 pr-16"
                  />

                  <span className="input-unit">
                    hours
                  </span>
                </div>
              </div>


              {/* Daily Unlocks */}
              <div>
                <label className="field-label">
                  Daily Phone Unlocks
                </label>

                <div className="input-wrapper">
                  <FiZap className="input-icon" />

                  <input
                    type="number"
                    name="daily_unlocks"
                    value={formData.daily_unlocks}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className="form-input pl-10"
                  />
                </div>
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
                <label className="field-label">
                  Study Hours / Day
                </label>

                <input
                  type="number"
                  name="study_hours"
                  value={formData.study_hours}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  className="form-input"
                />
              </div>


              {/* Physical Activity */}
              <div>
                <label className="field-label">
                  Physical Activity / Day
                </label>

                <div className="input-wrapper">
                  <FiActivity className="input-icon" />

                  <input
                    type="number"
                    name="physical_activity_hours"
                    value={formData.physical_activity_hours}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="form-input pl-10"
                  />

                  <span className="input-unit">
                    hours
                  </span>
                </div>
              </div>


              {/* Sleep */}
              <div>
                <label className="field-label">
                  Sleep / Night
                </label>

                <div className="input-wrapper">
                  <FiMoon className="input-icon" />

                  <input
                    type="number"
                    name="sleep_hours_per_night"
                    value={formData.sleep_hours_per_night}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className="form-input pl-10"
                  />

                  <span className="input-unit">
                    hours
                  </span>
                </div>
              </div>


              {/* Stress */}
<div className="md:col-span-3">

  <label className="field-label">
    Perceived Stress Level
  </label>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">

    {["Low", "Medium", "High", "Very High"].map((level) => (
      <button
        key={level}
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            stress_level: level,
          }))
        }
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

</div>

            </div>

          </div>


          {/* ================= ACTION ================= */}

          <div className="mt-10 pt-7 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5">

            <p className="text-xs text-gray-400 text-center sm:text-left">
              Your information is used only to generate the
              predicted score.
            </p>

        
            <button
              type="submit"
              className="w-full sm:w-auto px-8 h-12 rounded-xl bg-green-950 hover:bg-green-900 text-white text-sm font-semibold transition"
            >
              Analyze My Wellness →
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
        `}
      </style>

    </section>
  );
}

export default PredictionForm;