import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Slide1 from "./components/pages/slide1/slide1";
import Slide2 from "./components/pages/slide2/slide2";
import Slide3 from "./components/pages/slide3/slide3";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import StudentSignUp from "./components/StudentSignup/StudentSignUp";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Slide1 />} />
        <Route path="/slide2" element={<Slide2 />} />
        <Route path="/slide3" element={<Slide3 />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/questionPage" element={<QuestionPage />} />
        <Route path="/resultsPage" element={<ResultsPage />} />
        <Route path="/signup" element={<StudentSignUp />} />
      </Routes>
    </Router>   
  );
}

export default App;
