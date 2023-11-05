import { supa } from "../config/config.js";


const toggleButtons = document.querySelectorAll('.toggle-details');
const donateButtons = document.querySelectorAll('.donate-button');

toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const details = this.closest('details');
        const content = details.querySelector('.kachel-details');

        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            this.textContent = 'Weniger Informationen';
            this.classList.add('open');
        } else {
            content.style.display = 'none';
            this.textContent = 'Erfahre mehr';
            this.classList.remove('open');
        }
    });
});


donateButtons.forEach(button => {
    button.addEventListener('click', async function() {
                // Stelle sicher, dass der Benutzer angemeldet ist und erhalte die User-ID
                const user = supabase.auth.user();
                if (user) {
                    const userId = user.id; // Hier wird die User-ID abgerufen

                    // Erstelle ein Objekt, das du in der Patentier-Tabelle speichern möchtest
                    const donationData = {
                        userId: userId,
                        // Andere benötigte Informationen für die Spende
                    };
        
                    // Sende eine Anfrage an deine Supabase-Datenbank, um die User-ID in der Patentier-Tabelle zu speichern
                    const { data, error } = await supabase
                        .from('Animals') // Ersetze 'Patentier-Tabelle' durch den tatsächlichen Tabellennamen
                        .upsert([donationData]); // 'upsert' wird verwendet, um die Daten zu aktualisieren oder einzufügen
        
                    if (error) {
                        console.error('Fehler beim Speichern der User-ID in der Patentier-Tabelle:', error);
                    } else {
                        console.log('User-ID erfolgreich in der Patentier-Tabelle gespeichert');
                        alert('Vielen Dank für Ihre Spende!');
                    }
                } else {
                    console.log('Benutzer ist nicht angemeldet.');
                }
            });
    });








// Rufe die Funktion auf, um die Daten aus Supabase zu laden und in den Feed einzufügen
fetchAndAppendFeedData();



//supabase verknüpfung

// 2. Funktion zum Abrufen und Einbinden von Daten aus Supabase
async function fetchAndAppendFeedData() {
    const { data, error } = await supa
      .from('Animals') // Hier 'deine_tabelle' durch den Namen deiner Tabelle ersetzen
      .select('Name, Tierart, Preis, Picture, Herkunft, Kategorie_ID(Kontinent), Alter, Geschlecht, Beschreibung, id')


      console.log(data)

    if (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return;
    }

    const feedContainer = document.getElementById('feed'); // Hier 'feed' durch die ID deines Feed-Containers ersetzen

    // Daten aus der Supabase-Tabelle in deinen Feed einfügen
    data.forEach(tier => {
      
       let output = `
        <div class="Box">
            <details class="kacheln">
            <summary>
            <div class="Kacheln-image">
              <img src="${tier.Picture}" alt="Bild von ${tier.Name}">
            </div>
            <div class="textvorschau">
              <h3>${tier.Name}</h3>
              <p>${tier.Tierart}, ${tier.Preis} CHF/Monat</p>
            </div>
          </summary>
                <p><b>Herkunft:</b> ${tier.Herkunft}, ${tier.Kategorie_ID.Kontinent}</p>
                <p><b>Alter:</b> ${tier.Alter}</p>
                <p><b>Geschlecht:</b> ${tier.Geschlecht}</p>
                <p>${tier.Beschreibung}</p>
                <button class="donate-button"-${tier.id}">Ich will spenden</button>
            </details>
        </div>
      `;

      feedContainer.innerHTML += output;
    });

}

// Rufe die Funktion auf, um die Daten aus Supabase zu laden und in den Feed einzufügen
/*fetchAndAppendFeedData();
const { data, error } = await supa.from('Animals').select(`
  Kategorien_Id (Kontinent)
`)*/


//Filtern 

// Änderung in der filterByContinent-Funktion
async function filterByContinent(Kontinent) {
  const { data, error } = await supa
    .from('Animals')
    .select('Name, Tierart, Preis, Picture, Herkunft, Kategorie_ID(Kontinent), Alter, Geschlecht, Beschreibung, id')
    .eq('Kategorie_ID.Kontinent', Kontinent);

  if (error) {
    console.error('Fehler beim Filtern nach Kontinent:', error);
    return;
  }

  const feedContainer = document.getElementById('feed');
  feedContainer.innerHTML = '';

  data.forEach(tier => {
    let output = `
      <div class="Box" id="Box">
        <details class="kacheln">
          <summary>
            <div class="Kacheln-image">
              <img src="${tier.Picture}" alt="Bild von ${tier.Name}">
            </div>
            <div class="textvorschau">
              <h3>${tier.Name}</h3>
              <p>${tier.Tierart}, ${tier.Preis} CHF/Monat</p>
            </div>
          </summary>
          <p><b>Herkunft:</b> ${tier.Herkunft}, ${tier.Kategorie_ID.Kontinent}</p>
          <p><b>Alter:</b> ${tier.Alter}</p>
          <p><b>Geschlecht:</b> ${tier.Geschlecht}</p>
          <p>${tier.Beschreibung}</p>
          <button class="donate-button-${tier.id}">Ich will spenden</button>
        </details>
      </div>
    `;

    feedContainer.innerHTML += output;
  });
}




// Funktion für Buttons Navigation (Wechseln der Unterseite)
document.getElementById('feed-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
  window.location.href = 'kundenprofil.html';
});



/* 
const feedContainer = document.getElementById('feedContainer');

// Überprüfe, ob das Element gefunden wurde, bevor du den Event Listener hinzufügst
if (feedContainer) {
  // Hier fügst du den Event Listener hinzu
  feedContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('spenden')) {
      const index = event.target.getAttribute('data-index');
      const selectedTier = data[index];

      if (selectedTier) {
        const tierName = selectedTier.Name;
        console.log(`Geklicktes Element: ${tierName}`);
      }
    }
  });
} */



// Einem Tier eine User ID zuordnen
//const userID = initialUser.id; // Hier die UserID des angemeldeten Benutzers einsetzen
//const AnimalToAssign = {
  // Hier die Daten des Elements, das du dem Benutzer zuordnen möchtest
//  id: await supabase.from('Animals')
  // Weitere Datenfelder können hier hinzugefügt werden
//};

// Funktion zum Zuordnen des Elements zum Benutzer
//async function assignAnimalToUser() {
  // Aktualisiere das Tier mit der UserID des Spenders
//  const { data, error } = await supabase.from('Animals').upsert([
 //   {
  //    User_Id: userID,
  //    ...AnimalToAssign,
  //  },
  //]);

  //if (error) {
  //  console.error('Fehler beim Zuordnen des Elements zum Benutzer:', error);
  //} else {
  //  console.log('Element erfolgreich zugeordnet:', data);
  //}
//}

//assignAnimalToUser();