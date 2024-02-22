import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function signUpUser(email, password) {
    // Lipitha field validation here
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Jamie and Akshitha Function
        })
        .catch((error) => {
            console.error(error);
        });
}