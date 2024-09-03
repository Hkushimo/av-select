document.addEventListener('DOMContentLoaded', function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const cardContainer = document.getElementById('cardContainer');
            rows.forEach((row) => {
                const cols = row.querySelectorAll('td');
                
                // Check for any empty or invalid rows
                if (cols.length === 0 || cols[0].innerText.trim() === '' || cols[0].innerText.trim().toLowerCase() === 'name') {
                    return; // Skip this row
                }

                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h2');
                name.textContent = cols[0].innerText.trim();
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position:</strong> ${cols[1].innerText.trim()}`;
                card.appendChild(position);

                const tags = document.createElement('p');
                tags.innerHTML = `<strong>Tags:</strong> ${cols[2].innerText.trim()}`;
                card.appendChild(tags);

                const location = document.createElement('p');
                location.innerHTML = `<strong>Location:</strong> ${cols[3].innerText.trim()}`;
                card.appendChild(location);

                const email = document.createElement('p');
                email.innerHTML = `<strong>Contact Email:</strong> ${cols[4].innerText.trim()}`;
                card.appendChild(email);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const stateInput = document.getElementById('stateI
