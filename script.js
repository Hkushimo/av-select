document.addEventListener('DOMContentLoaded', function () {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOZ_RmjKIIyx_EeTdU-AyzdgMiRExLAHyx6tiJMfu1MnZ-mQRCmueAzEiVtcT9KJexmX0k7NjTzv4g/pubhtml';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const cardContainer = document.getElementById('cardContainer');
            let allCards = []; // Store cards for filtering

            rows.forEach((row, index) => {
                const cols = row.querySelectorAll('td');

                // Skip empty rows and ensure there is enough data to create a card
                if (!cols || cols.length < 9) return;

                // Get data from columns
                const timestamp = cols[0]?.innerText.trim();
                const nameValue = cols[1]?.innerText.trim();
                const positionValue = cols[2]?.innerText.trim();
                const cityValue = cols[3]?.innerText.trim();
                const stateValue = cols[4]?.innerText.trim();
                const phoneValue = cols[5]?.innerText.trim();
                const emailValue = cols[6]?.innerText.trim();
                const ratingValue = parseFloat(cols[7]?.innerText.trim());
                const reviewLinkValue = cols[8]?.innerText.trim();
                const imageUrl = cols[9]?.innerText.trim();  // Assuming image is in Column I

                // Create card
                const card = document.createElement('div');
                card.className = 'card';

                if (imageUrl) {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = `${nameValue}'s photo`;
                    card.appendChild(img);
                }

                const name = document.createElement('h2');
                name.textContent = nameValue;
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position(s):</strong> ${positionValue}`;
                card.appendChild(position);

                const city = document.createElement('p');
                city.innerHTML = `<strong>City:</strong> ${cityValue}`;
                card.appendChild(city);

                const state = document.createElement('p');
                state.innerHTML = `<strong>State:</strong> ${stateValue}`;
                card.appendChild(state);

                const phone = document.createElement('p');
                phone.innerHTML = `<strong>Phone:</strong> ${phoneValue}`;
                card.appendChild(phone);

                const email = document.createElement('p');
                email.innerHTML = `<strong>Email:</strong> ${emailValue}`;
                card.appendChild(email);

                const rating = document.createElement('p');
                rating.innerHTML = `<strong>Rating:</strong> <span class="${ratingValue < 3 ? 'rating-red' : ''}">${isNaN(ratingValue) ? 'N/A' : ratingValue.toFixed(2)}</span>`;
                card.appendChild(rating);

                // Create review button
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';

                if (reviewLinkValue) {
                    const reviewButton = document.createElement('a');
                    reviewButton.href = reviewLinkValue;
                    reviewButton.target = '_blank';
                    reviewButton.className = 'review-button';
                    reviewButton.textContent = 'Leave Review';
                    buttonContainer.appendChild(reviewButton);
                }

                card.appendChild(buttonContainer);
                cardContainer.appendChild(card);

                // Store card for filtering
                allCards.push({
                    cardElement: card,
                    nameValue,
                    positionValue,
                    cityValue,
                    stateValue,
                });
            });

            // Add filtering functionality
            document.getElementById('searchInput').addEventListener('input', () => filterCards(allCards));
            document.getElementById('cityInput').addEventListener('input', () => filterCards(allCards));
            document.getElementById('stateInput').addEventListener('input', () => filterCards(allCards));
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

// Filter function
function filterCards(cards) {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityInput = document.getElementById('cityInput').value.toLowerCase();
    const stateInput = document.getElementById('stateInput').value.toLowerCase();

    cards.forEach(({ cardElement, nameValue, positionValue, cityValue, stateValue }) => {
        const matchesSearch = !searchInput || positionValue.toLowerCase().includes(searchInput);
        const matchesCity = !cityInput || cityValue.toLowerCase().includes(cityInput);
        const matchesState = !stateInput || stateValue.toLowerCase().includes(stateInput);

        if (matchesSearch && matchesCity && matchesState) {
            cardElement.style.display = 'block';  // Show the card
        } else {
            cardElement.style.display = 'none';   // Hide the card
        }
    });
}
