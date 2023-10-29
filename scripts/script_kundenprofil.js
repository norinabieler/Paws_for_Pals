import { supa } from "../config/config.js";

// Hier dann noch richtig mit Unterseiten verknüpfen
document.getElementById('feed-button').addEventListener('click', () => {
    window.location.href = 'feed.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
    window.location.href = 'kundenprofil.html';
});


// FUNKTIONIERT SO NOCH NICHT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Funktion zum Löschen eines Listenelements
        function deleteListItem(event) {
            const listItem = event.target.parentElement; // Das übergeordnete Listenelement
            listItem.remove(); // Entfernen Sie das Listenelement aus dem DOM
        }

        // Alle Löschen-Buttons auswählen und Event-Handler hinzufügen
        const deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach(button => {
            button.addEventListener("click", deleteListItem);
        });