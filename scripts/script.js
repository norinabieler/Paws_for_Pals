import { supa } from "../config/config.js";

// HIER FUNKTIONIERT ALLES NOCH NICHT SO RICHTIG

// Function to login using email and password
async function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signIn({ email, password });

    if (error) {
        console.error("Error during login: ", error.message);
    } else {
        window.location.href = 'feed.html';
        console.log("Logged in as ", email);
    }
}

document.getElementById('loginButton').addEventListener('click', login);


// Function to sign up using email and password
async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signUp({ email, password });

    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
    }
}