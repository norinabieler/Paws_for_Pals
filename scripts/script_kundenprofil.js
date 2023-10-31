import { supa } from "../config/config.js";


document.getElementById('feed-button').addEventListener('click', () => {
    window.location.href = 'feed.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
    window.location.href = 'kundenprofil.html';
});


// Funktion zum Abmelden
async function logout() {

    //Add console log if function works
    console.log("Logout ausgeführt");


    const { error } = await supa.auth.signOut();
  
    if (!error) {
      alert("Erfolgreich abgemeldet.");
      window.location.href = "login.html"; // Optional: Nach der Abmeldung zur Login-Seite weiterleiten
    } else {
      alert("Fehler beim Abmelden: " + error.message);
    }
  }
  
  // Event-Listener für den Abmelde-Button
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }


/* // FUNKTIONIERT SO NOCH NICHT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Funktion zum Löschen eines Listenelements
        function deleteListItem(event) {
            const listItem = event.target.parentElement; // Das übergeordnete Listenelement
            listItem.remove(); // Entfernen Sie das Listenelement aus dem DOM
        }

        // Alle Löschen-Buttons auswählen und Event-Handler hinzufügen
        const deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach(button => {
            button.addEventListener("click", deleteListItem);
        }); */