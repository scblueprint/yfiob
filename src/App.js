import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Slide1 from "./components/pages/slide1/slide1";
import Slide2 from "./components/pages/slide2/slide2";
import Slide3 from "./components/pages/slide3/slide3";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import AdminLogin from "./components/adminLogin/AdminLogin";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import StudentSignUp from "./components/StudentSignup/StudentSignUp";
import StudentSignUp2 from "./components/StudentSignup/StudentSignUp2";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UsersPanel from "./components/UsersPanel/UsersPanel";
import DataPage from "./components/DataPage/DataPage";
import React from "react";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Slide1 />} />
        <Route path="/slide2" element={<Slide2 />} />
        <Route path="/slide3" element={<Slide3 />} />
        <Route path="/login" element={<StudentLogin setUser={setUser} />} />
        <Route path="/admin" element={<AdminLogin setUser={setUser} />} />
        <Route path="/questionPage" element={<QuestionPage />} />
        <Route path="/signup" element={<StudentSignUp />} />
        <Route path="/signup2" element={<StudentSignUp2 />} />  
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/usersPanel" element={<UsersPanel />} />
        <Route path="/dataPage" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
