import { supa } from "../config/config.js";

console.log("Script.js ausgeführt");


// Function to check if the user is logged in and redirect if necessary
async function checkUser() {
    const user = supa.auth.user();
    if (user) {
        console.log("User is already logged in as", user.email);
        window.location.href = 'http://localhost:5500/index.html'; // Weiterleitung zu einer anderen Seite
    } else {
        console.log("User is not logged in.");
    }
}

// Event listener für das Überprüfen des Benutzers beim Laden der Seite
window.addEventListener('load', checkUser);



// Function to login using email and password_______________________________________________________________________________________________
async function login() {
    console.log("Login ausgeführt");
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signIn({ email, password });

    if (error) {
        console.error("Error during login: ", error.message);
    } else {
        console.log("Logged in as ", email);
        window.location.href = 'http://localhost:5500/index.html'

    }
}

//______________________________________________________________________________________________________________________________



// Function to sign up using email and password
async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const { error } = await supa.auth.signUp({ name, email, password });

    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
    }
}

//________________________________________________________________________________________________________________________________________________



 // Function to update user status
function updateUserStatus(user) {
    const userStatusElement = document.getElementById('userStatus');

    if (user) {
        userStatusElement.textContent = `Authenticated as: ${user.email}`;
    } else {
        userStatusElement.textContent = `Not authenticated.`;
    }
} 

//____________________________________________________________________________________________________________________________________

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginButton').addEventListener('click', login);

document.getElementById('signupButton').addEventListener('click', signUp);
