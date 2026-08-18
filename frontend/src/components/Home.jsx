import Connect from "./Connect";
import Hero from "./Hero";
import Navbar from "./Navbar";
import PredictionForm from "./PredictionForm";

function Home() {
  return (
    <div className="min-h-screen bg-[#f3f6f3]">

      {/* <Navbar /> */}

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* Hero */}
         <Hero/>

        {/* Prediction Form */}
        <div className="mt-10">
            <PredictionForm/>
        </div>
  


        {/* Bottom Information */}
<Connect/>

        


        <p className="text-center text-lg text-gray-400 mt-10">
          This tool provides an estimated wellness score and is not
          a medical diagnosis.
        </p>

      </main>

    </div>
  );
}

export default Home;