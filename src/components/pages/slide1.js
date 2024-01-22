import React from 'react'
import { Link } from 'react-router-dom';
import './slide1.css';

function Slide_1() {
    return (
        <div className="page">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>
              <div className="titleText">
                    What Careers Can You Explore?
              </div>
              <div class = "filledContainer">
                <div className="text">
                    Let us help find how your interests can relate to different fields of work! Take this quiz to help give you ideas on what your career search can look like.
                </div>
                <div class = "innerBodyContainer">
                  <div class = "innerBodyContainer" style = {{display: 'inline-flex' , flexDirection: 'column', justifyContent: 'space-evenly', gap: 20}}>
                    <div class = "innerGreyBox">
                        <Link to="/slide2" className="assessButton">
                            Quick Assessment
                        </Link>
                    </div>
                    <div class = "text">
                        This quick assessment consists of 6 questions, but will not be as representative of who you are.
                    </div>
                  </div>
                  <div class = "innerBodyContainer" style = {{width: 283, height: 238, display: 'inline-flex' , flexDirection: 'column', justifyContent: 'space-evenly', gap: 20}}>
                    <div class = "innerGreyBox">
                        <div class = "text">
                            Detailed Assessment <br></br>(In-Development)
                        </div>
                    </div>
                    <div class = "text">
                      This detailed assessment consists of 60 questions.
                    </div>
                  </div>
                </div>
              </div>
        </div>
      );
}

export default Slide_1;