const Connect = () => {
  return (
    <section className="mt-16 bg-green-950 rounded-2xl p-8 sm:p-10 text-white">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-green-300">
            For Learners & Developers
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-serif">
            Curious how this project was built?
          </h2>

          <p className="mt-3 text-sm leading-6 text-green-100/70">
            Explore the complete journey behind this machine learning
            project — from data preprocessing and model training to
            FastAPI deployment and React integration.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 px-6 py-3 rounded-lg bg-white text-green-950 text-sm font-semibold hover:bg-green-50 transition"
        >
          <a href="https://my-portfolio-roan-three-23.vercel.app/mental_health_score_explain" target="_blank">Explore the Project →</a>
          
        </button>

      </div>

    </section>
  );
};

export default Connect;