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

                // Check if the first column (Name) exists and is not empty
                if (!cols[0] || cols[0].innerText.trim() === '' || cols[0].innerText.trim().toLowerCase() === 'name') {
                    return; // Skip this row
                }

                // Create card elements
                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h2');
                name.textContent = cols[0].innerText.trim();
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position:</strong> ${cols[1] ? cols[1].innerText.trim() : 'N/A'}`;
                card.appendChild(position);

                const tags = document.createElement('p');
                tags.innerHTML = `<strong>Tags:</strong> ${cols[2] ? cols[2].innerText.trim() : 'N/A'}`;
                card.appendChild(tags);

                const location = document.createElement('p');
                location.innerHTML = `<strong>Location:</strong> ${cols[3] ? cols[3].innerText.trim() : 'N/A'}`;
                card.appendChild(location);

                const email = document.createElement('p');
                email.innerHTML = `<strong>Contact Email:</strong> ${cols[4] ? cols[4].innerText.trim() : 'N/A'}`;
                card.appendChild(email);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const stateInput = document.getElementById('stateInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const position = card.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const tags = card.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const location = card.querySelector('p:nth-child(4)').textContent.toLowerCase();

        if (
            (position.includes(searchInput) || tags.includes(searchInput)) &&
            (location.includes(stateInput) || stateInput === '')
        ) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
