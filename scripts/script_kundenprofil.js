import { supa } from "../config/config.js";

 // Function to update user status
 function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');

  if (user) {
      userStatusElement.textContent = `${user.email}`;
  } else {
      userStatusElement.textContent = `Not authenticated.`;
  }
} 

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

console.log(initialUser.id);



fetchAndAppendAnimalData();



document.getElementById('feed-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
    window.location.href = 'kundenprofil.html';
});




// Hier Funktion um Patentiere einzufügen 
// Abrufen und Einbinden von Daten aus Supabase

async function fetchAndAppendAnimalData() {
  const patentierContainer = document.getElementById('patentiere');
  patentierContainer.innerHTML = '';

  const userId = initialUser.id

  const { data, error } = await supa
    .from('Animals') // Hier 'deine_tabelle' durch den Namen deiner Tabelle ersetzen
    .select('Name, Tierart, Preis, Picture, Herkunft, Kategorie_ID(Kontinent), Alter, Geschlecht, Beschreibung, id, User_Id')
    .eq('User_Id', userId);

  console.log(data)

  if (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return;
  }

  // Daten aus der Supabase-Tabelle in deinen Feed einfügen
  data.forEach(tier => {
    
     let output = `
      <div class="Box">
          <div class="text">
            <h3>${tier.Name}</h3>
            <p>${tier.Tierart}, ${tier.Preis} CHF/Monat</p>
          </div>
            <p><b>Herkunft:</b> ${tier.Herkunft}, ${tier.Kategorie_ID.Kontinent}</p>
            <p><b>Alter:</b> ${tier.Alter}</p>
            <p><b>Geschlecht:</b> ${tier.Geschlecht}</p>
            <button id="deleteButton-${tier.id}" class="delete-button>Spende beenden</button>
      </div>
    `;
    patentierContainer.innerHTML += output;
  });
}


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