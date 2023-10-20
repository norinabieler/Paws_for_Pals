
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

// Dummyfunktionen für die Buttons unten
document.getElementById('feed-button').addEventListener('click', () => alert('Zum Feed gehen'));
document.getElementById('profile-button').addEventListener('click', () => alert('Zum Profil gehen'));




//supabase verknüpfung
const supabase = createClient('Dhttps://rqqllrdsamxzjjulenht.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWxscmRzYW14empqdWxlbmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3NDEsImV4cCI6MjAxMTkxMjc0MX0.JXkSXYVb1M4aHRet-UmScJNXogv_4QZzuzlkGqywA0Y');


// 2. Funktion zum Abrufen und Einbinden von Daten aus Supabase
async function fetchAndAppendFeedData() {
  try {
    const { data, error } = await supabase
      .from('Animals') // Hier 'deine_tabelle' durch den Namen deiner Tabelle ersetzen
      .select('*');

    if (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      return;
    }

    const feedContainer = document.getElementById('feed'); // Hier 'feed' durch die ID deines Feed-Containers ersetzen

    // Daten aus der Supabase-Tabelle in deinen Feed einfügen
    data.forEach(tier => {
      const tierElement = document.createElement('div');
      tierElement.innerHTML = `
        <div class="Box">
            <details class="Kacheln">
                <summary>
                    <h3>${tier.name}</h3>
                    <p>${tier.herkunft}, ${tier.preis}/Monat</p>
                </summary>
                <p><b>Herkunft:</b> ${tier.herkunft}</p>
                <p><b>Alter:</b> ${tier.alter}</p>
                <p><b>Geschlecht:</b> ${tier.geschlecht}</p>
                <p>${tier.text}</p>
                <button onclick="showDetails(this)">Jetzt spenden</button>
                <div style="display: none;">
                    <p>Weitere Informationen über ${tier.name}...</p>
                    <button onclick="donate()">Jetzt spenden</button>
                </div>
            </details>
        </div>
      `;

      feedContainer.appendChild(tierElement);
    });
  } catch (error) {
    console.error('Ein Fehler ist aufgetreten:', error);
  }
}

// Rufe die Funktion auf, um die Daten aus Supabase zu laden und in den Feed einzufügen
fetchAndAppendFeedData();
