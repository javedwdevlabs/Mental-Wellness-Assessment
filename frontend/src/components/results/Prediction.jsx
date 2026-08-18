import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiActivity, FiCheckCircle, FiX } from "react-icons/fi";

function Prediction() {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  if (!result) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
        >
          <FiX size={18} />
        </button>

        {loading ? (

          /* ================= LOADING ================= */

          <div className="px-6 py-14 sm:px-10 text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">

              <div className="w-10 h-10 border-4 border-green-200 border-t-green-950 rounded-full animate-spin" />

            </div>

            <h2 className="mt-7 text-2xl font-serif text-green-950">
              Reading your signal...
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 max-w-sm mx-auto">
              Our machine learning model is analyzing your lifestyle
              and daily habits.
            </p>

            <div className="mt-7 flex justify-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-green-900 animate-bounce" />

              <span className="w-2 h-2 rounded-full bg-green-900 animate-bounce [animation-delay:150ms]" />

              <span className="w-2 h-2 rounded-full bg-green-900 animate-bounce [animation-delay:300ms]" />

            </div>

          </div>

        ) : (

          /* ================= RESULT ================= */

          <div>

            {/* Result Header */}
            <div className="bg-green-950 px-6 py-8 sm:px-10 text-white text-center">

              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <FiActivity size={22} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-widest text-green-300">
                Your Wellness Signal
              </p>

              <div className="mt-3 flex items-end justify-center gap-2">

                <span className="text-6xl font-serif">
                  {result.predicted_mental_health_score}
                </span>

                <span className="mb-2 text-green-300 text-sm">
                  / 10
                </span>

              </div>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm">

                <FiCheckCircle size={16} />

                {result.stress_category}

              </div>

            </div>


            {/* Result Details */}
            <div className="px-6 py-7 sm:px-10">

              <h3 className="text-lg font-semibold text-gray-800">
                What this means
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {result.condition_summary}
              </p>


              {/* Disclaimer */}
              <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100">

                <p className="text-xs font-semibold text-green-900 uppercase tracking-wide">
                  Important
                </p>

                <p className="mt-1 text-xs leading-5 text-green-800/70">
                  This tool provides an estimated wellness score
                  and is not a medical diagnosis.
                </p>

              </div>


              <button
                type="button"
                onClick={handleClose}
                className="w-full mt-6 h-11 rounded-xl bg-green-950 text-white text-sm font-semibold hover:bg-green-900 transition"
              >
                Run Another Assessment
              </button>

            </div>

          </div>

        )}
 
      </div>

    </div>
  );
}

export default Prediction;