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
    button.addEventListener('click', function() {
        // Hier kannst du den Spendenprozess implementieren
        alert('Vielen Dank für Ihre Spende!');
    });
});

function filterByContinent(continent) {
    // Hier kannst du die Filterung nach Kontinent implementieren
    alert(`Filtern nach Kontinent: ${continent}`);
}

// Funktion für Buttons Navigation (Wechseln der Unterseite)
document.getElementById('feed-button').addEventListener('click', () => {
    window.location.href = 'feed.html';
});

document.getElementById('profile-button').addEventListener('click', () => {
    window.location.href = 'kundenprofil.html';
});




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
                <button class="spenden" onclick="moveToOtherDocument()">Ich will spenden</button>
                <div style="display: none;">
                    <p>Weitere Informationen über ${tier.Name}...</p>
                    <button class="spenden" onclick="moveToOtherDocument(${tier.id})">Ich will spenden</button>
                </div>
            </details>
        </div>
      `;

      feedContainer.innerHTML += output;
    });

}

// Rufe die Funktion auf, um die Daten aus Supabase zu laden und in den Feed einzufügen
fetchAndAppendFeedData();
const { data, error } = await supa.from('Animals').select(`
  Kategorien_Id (Kontinent)
`)


