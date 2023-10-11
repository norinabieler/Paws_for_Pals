
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