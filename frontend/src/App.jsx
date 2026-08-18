import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Prediction from "./components/results/Prediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;