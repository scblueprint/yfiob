import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// password validation
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;
    return passwordRegex.test(password);
}

function signUpUser(email, password) {
    // validate fields
    if (!isValidEmail(email)) {
        console.error("Invalid email");
        return;
    }

    if (!isValidPassword(password)) {
        console.error("Invalid password");
        return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Jamie and Akshitha Function
        })
        .catch((error) => {
            console.error(error);
        });
}
