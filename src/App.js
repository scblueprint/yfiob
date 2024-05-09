import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
// import Slide1 from "./components/pages/slide1/slide1";
// import Slide2 from "./components/pages/slide2/slide2";
// import Slide3 from "./components/pages/slide3/slide3";
// import StudentLogin from "./components/StudentLogin/StudentLogin";
// import AdminLogin from "./components/adminLogin/AdminLogin";
// import QuestionPage from "./components/QuestionPage/QuestionPage";
// import StudentSignUp from "./components/StudentSignup/StudentSignUp";
// import StudentSignUp2 from "./components/StudentSignup/StudentSignUp2";
// import AdminPanel from "./components/AdminPanel/AdminPanel";
// import UsersPanel from "./components/UsersPanel/UsersPanel";
// import DataPage from "./components/DataPage/DataPage";
import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Dashboard>
      <Dashboard.Content
        title={"Data"}
        subtitle={"Breakdown of students career quiz results"}
      >
        Dashboard Content
      </Dashboard.Content>
    </Dashboard>
  );
}

export default App;
