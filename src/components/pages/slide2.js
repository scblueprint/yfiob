import React from "react";
import { Link } from 'react-router-dom';
import "./slide2.css";

export default function Slide2() {
  return (
    <div className="page">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>
              <div className="titleText2">
                    Before You Start Answering
              </div>
              <div class = "filledContainer2">
                <div className="text">
                    Please sign in to make sure your progress and results are saved. <br></br>You will also be able to login after the quiz to save the results but it does not save your progress through the quiz.
                </div>
                <div class = "innerBodyContainer2">
                    <div class = "innerGreyBox1">
                        <Link to="/login" className="loginButton">
                            Sign Up / Login In
                        </Link>
                    </div>
                    <div class = "innerGreyBox2">
                        <Link to="/slide3" className="assessButton">
                            I don't want to sign in
                        </Link>
                    </div>
                  </div>
              </div>
        </div>
  );
}