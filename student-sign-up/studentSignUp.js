import React from "react";
import "./StudentSignUp.css";

export default function Login() {
    return (
        <div className="Signup-Container">
            <div className="Background">
                <div className="StudentSignUp">Student Sign Up!</div>
                <div className="Frame1">
                    <div className="Frame2">
                        <div className="Frame3">
                            <div className="Group1">
                                <div className="InputTitle">First Name</div>
                                <div className="Frame4">
                                    <div className="ShortRectangle"/>
                                    <div className="Input">First Name</div>
                                </div>
                            </div>
                            <div className="Group1">
                                <div className="InputTitle">Last Name</div>
                                <div className="Frame4">
                                    <div className="ShortRectangle"/>
                                    <div className="Input">Last Name</div>
                                </div>
                            </div>
                        </div>
                        <div className="Group2">
                            <div className="InputTitle">Email</div>
                            <div className="Frame4">
                                <div className="LongRectangle"/>
                                <div className="Input">Email</div>
                            </div>
                        </div>
                        <div className="Group2">
                            <div className="InputTitle">Password</div>
                            <div className="Frame4">
                                <div className="LongRectangle"/>
                                <div className="Input">Password</div>
                            </div>
                        </div>
                        <div className="Group2">
                            <div className="InputTitle">Confirm Password</div>
                            <div className="Frame4">
                                <div className="LongRectangle"/>
                                <div className="Input">Confirm Password</div>
                            </div>
                        </div>
                    </div>
                    <div className="SignUpFrame">
                        <div className="SignUp">Sign Up!</div>
                    </div>
                    <div className="Group3">
                        <div className="AlreadyHaveAnAccount">Already have an account?</div>
                        <div className="LogIn">Log In!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}