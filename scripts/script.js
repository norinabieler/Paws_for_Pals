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
        console.log("Logged in as ", email);
    }
}

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

// Function to update user status
function updateUserStatus(user) {
    const userStatusElement = document.getElementById('userStatus');

    if (user) {
        userStatusElement.textContent = `Authenticated as: ${user.email}`;
    } else {
        userStatusElement.textContent = "Not authenticated.";
    }
}

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginButton').addEventListener('click', login);

document.getElementById('signupButton').addEventListener('click', signUp);
