document.addEventListener('DOMContentLoaded', function () {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOZ_RmjKIIyx_EeTdU-AyzdgMiRExLAHyx6tiJMfu1MnZ-mQRCmueAzEiVtcT9KJexmX0k7NjTzv4g/pubhtml';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const cardContainer = document.getElementById('cardContainer');
            let allCards = []; // Keep track of all cards

            rows.forEach((row, index) => {
                const cols = row.querySelectorAll('td');

                // Skip the header row
                if (index === 0) return;

                // Validate and trim values
                const timestamp = cols[0]?.innerText.trim() || 'N/A';
                const nameValue = cols[1]?.innerText.trim() || 'N/A';
                const positionValue = cols[2]?.innerText.trim() || 'N/A';
                const cityValue = cols[3]?.innerText.trim() || 'N/A';
                const stateValue = cols[4]?.innerText.trim() || 'N/A';
                const phoneValue = cols[5]?.innerText.trim() || 'N/A';
                const emailValue = cols[6]?.innerText.trim() || 'N/A';
                const ratingValue = parseFloat(cols[7]?.innerText.trim());
                const reviewLinkValue = cols[8]?.innerText.trim();
                const imageUrl = cols[9]?.innerText.trim(); // Assuming the image URL is in column 10

                // Check if mandatory fields are present (name, position, city, state)
                if (nameValue === 'N/A' || positionValue === 'N/A') {
                    console.warn(`Skipping row due to missing critical data at index ${index}`);
                    return;
                }

                // Create card element
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

                // Create button container for review link
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
                allCards.push(card); // Store reference to the card for filtering
            });

            // Call the filterCards function after cards are loaded
            filterCards(); // Ensure filtering works after initial load
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
