import { supa } from "../config/config.js";

// Hier dann noch richtig mit Unterseiten verknüpfen
document.getElementById('feed-button').addEventListener('click', () => {
    window.location.href = 'feed.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
    window.location.href = 'kundenprofil.html';
});
