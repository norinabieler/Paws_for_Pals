import { supa } from "../config/config.js";

// Function to update user status
function updateUserStatus(user) {
  const userStatusElement = document.getElementById("userStatus");

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

document.getElementById("feed-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("profile-button").addEventListener("click", () => {
  window.location.href = "kundenprofil.html";
});

// Hier Funktion um Patentiere einzufügen
// Abrufen und Einbinden von Daten aus Supabase

async function fetchAndAppendAnimalData() {
  const patentierContainer = document.getElementById("patentiere");
  patentierContainer.innerHTML = "";

  const userId = initialUser.id;

  const { data, error } = await supa
    .from("Animals")
    .select(
      "Name, Tierart, Preis, Picture, Herkunft, Kategorie_ID(Kontinent), Alter, Geschlecht, Beschreibung, id, User_Id"
    )
    .eq("User_Id", userId);

  console.log(data);

  if (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    return;
  }

  // Daten aus der Supabase-Tabelle in deinen Feed einfügen
  data.forEach((tier) => {
    const boxDiv = document.createElement("div");
    boxDiv.className = "Box";

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.innerHTML = `
      <h3>${tier.Name}</h3>
      <p>${tier.Tierart}, ${tier.Preis} CHF/Monat</p>
    `;

    boxDiv.appendChild(textDiv);

    const details = `
      <p><b>Herkunft:</b> ${tier.Herkunft}, ${tier.Kategorie_ID.Kontinent}</p>
      <p><b>Alter:</b> ${tier.Alter}</p>
      <p><b>Geschlecht:</b> ${tier.Geschlecht}</p>
    `;

    boxDiv.innerHTML += details;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Spende beenden";
    deleteButton.className = "deleteButton";
    deleteButton.onclick = async () => {
      // Delete functionality here
      // console.log(`Deleting ${tier.id}`);
      await deleteAnimal(tier.id, userId);
      // Call the delete function here, e.g., await deleteAnimal(tier.id);
    };

    boxDiv.appendChild(deleteButton);
    patentierContainer.appendChild(boxDiv);
  });
}

// You should have a function to handle the actual delete operation
async function deleteAnimal(tierId, userId) {
  // Call supabase to delete the animal
  // Update the UI accordingly
  console.log(tierId);
  console.log(userId);

  if (userId) {

    // Entferne die User-ID aus der Datenbank
    const { error } = await supa
      .from("Animals")
      .update({ User_Id: null })
      .eq("id", tierId);

    if (error) {
      console.error(
        "Fehler beim Entfernen der User-ID aus der Patentier-Tabelle:",
        error
      );
    } else {
      console.log("User-ID erfolgreich aus der Patentier-Tabelle entfernt");
    }
  } else {
    console.log(
      "Der Benutzer hat keine Berechtigung zum Entfernen der User-ID."
    );
  }
}

//________________________________________________________________________________________________________________________________________________

async function removeUserID() {
  // Daten aus der Tabelle 'Animals' abrufen
  const { data, error } = await supa.from("Animals").select("id, User_Id");

  if (error) {
    console.error("Fehler beim Abrufen der Daten aus der Tabelle:", error);
    console.log("Fehler");
    return;
  }

  // Event-Handler für Löschen-Buttons hinzufügen
  data.forEach((tier) => {
    const deleteButton = document.getElementById(`deleteButton-${tier.id}`);
    console.log(deleteButton);

    deleteButton.addEventListener("click", async () => {
      console.log(tier.id); // Stelle sicher, dass der Benutzer angemeldet ist und erhalte die User-ID

      const user = supa.auth.user();
      if (user) {
        const userId = user.id;

        // Entferne die User-ID aus der Datenbank
        const { error } = await supa
          .from("Animals")
          .update({ User_Id: null })
          .eq("id", tier.id);

        if (error) {
          console.error(
            "Fehler beim Entfernen der User-ID aus der Patentier-Tabelle:",
            error
          );
        } else {
          console.log("User-ID erfolgreich aus der Patentier-Tabelle entfernt");
        }
      } else {
        console.log(
          "Der Benutzer hat keine Berechtigung zum Entfernen der User-ID."
        );
      }
    });
  });
}

//________________________________________________________________________________________________________________________________________________

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
