import React from "react"
import styles from "./LoginPage.Module.css"

export default function LoginPage () {
    return (
        <div>
            <h1 className={`${styles.pageHeader}`}>Before You Start Answering</h1>

             
            <div className={`${styles.loginBox}`}>
                <p className={`${styles.loginText}`}>
                    Please sign in to make sure your progress and results are saved.
                    
                    You will also be able to login after the quiz to save the results but it does not save your progress through the quiz
                </p>

                <button>
                    Sign In / Log In section
                </button>

                <button>
                    I don't want to sign in
                </button>

            </div>
        
        </div>
    )
}