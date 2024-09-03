document.addEventListener('DOMContentLoaded', function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const cardContainer = document.getElementById('cardContainer');
            rows.forEach((row, index) => {
                const cols = row.querySelectorAll('td');
                
                // Skip the header row or rows with empty required fields
                const nameValue = cols[0]?.innerText.trim();
                const positionValue = cols[1]?.innerText.trim();
                const cityValue = cols[2]?.innerText.trim();
                const stateValue = cols[3]?.innerText.trim();
                const contactPhoneValue = cols[4]?.innerText.trim();
                const contactEmailValue = cols[5]?.innerText.trim();
                const reviewLinkValue = cols[6]?.innerText.trim();
                const ratingValue = cols[7]?.innerText.trim();

                if (index === 0 || !nameValue || !positionValue || !cityValue || !stateValue) {
                    return; // Skip header and rows with missing critical data
                }

                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h2');
                name.textContent = nameValue;
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position:</strong> ${positionValue}`;
                card.appendChild(position);

                // Separate fields for City and State
                const city = document.createElement('p');
                city.innerHTML = `<strong>City:</strong> ${cityValue}`;
                card.appendChild(city);

                const state = document.createElement('p');
                state.innerHTML = `<strong>State:</strong> ${stateValue}`;
                card.appendChild(state);

                const contactPhone = document.createElement('p');
                contactPhone.innerHTML = `<strong>Contact Phone:</strong> ${contactPhoneValue}`;
                card.appendChild(contactPhone);

                const contactEmail = document.createElement('p');
                contactEmail.innerHTML = `<strong>Contact Email:</strong> ${contactEmailValue}`;
                card.appendChild(contactEmail);

                const rating = document.createElement('p');
                rating.innerHTML = `<strong>Rating:</strong> ${ratingValue}`;
                card.appendChild(rating);

                if (reviewLinkValue) {
                    const reviewButton = document.createElement('a');
                    reviewButton.href = reviewLinkValue;
                    reviewButton.target = '_blank';
                    reviewButton.className = 'review-button';
                    reviewButton.textContent = 'Leave Review';
                    reviewButton.style.display = 'inline-block';
                    reviewButton.style.padding = '10px 15px';
                    reviewButton.style.marginTop = '10px';
                    reviewButton.style.backgroundColor = '#007BFF';
                    reviewButton.style.color = '#fff';
                    reviewButton.style.borderRadius = '5px';
                    reviewButton.style.textDecoration = 'none';
                    reviewButton.style.textAlign = 'center';
                    card.appendChild(reviewButton);
                }

                cardContainer.appendChild(card);
            });

            // After generating the cards, attach the filter functionality
            filterCards(); // Ensure it runs on initial load
            document.getElementById('searchInput').addEventListener('input', filterCards);
            document.getElementById('cityInput').addEventListener('input', filterCards);
            document.getElementById('stateInput').addEventListener('change', filterCards);
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityInput = document.getElementById('cityInput').value.toLowerCase();
    const stateInput = document.getElementById('stateInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const position = card.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const city = card.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const state = card.querySelector('p:nth-child(4)').textContent.toLowerCase();

        const matchesSearch = searchInput === "" || position.includes(searchInput);
        const matchesCity = cityInput === "" || city.includes(cityInput);
        const matchesState = stateInput === "" || state.includes(stateInput);

        if (matchesSearch && matchesCity && matchesState) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
