document.addEventListener('DOMContentLoaded', function () {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml';

    const stateAbbreviations = {
        "al": "Alabama", "ak": "Alaska", "az": "Arizona", "ar": "Arkansas",
        "ca": "California", "co": "Colorado", "ct": "Connecticut", "de": "Delaware",
        "fl": "Florida", "ga": "Georgia", "hi": "Hawaii", "id": "Idaho", "il": "Illinois",
        "in": "Indiana", "ia": "Iowa", "ks": "Kansas", "ky": "Kentucky", "la": "Louisiana",
        "me": "Maine", "md": "Maryland", "ma": "Massachusetts", "mi": "Michigan",
        "mn": "Minnesota", "ms": "Mississippi", "mo": "Missouri", "mt": "Montana",
        "ne": "Nebraska", "nv": "Nevada", "nh": "New Hampshire", "nj": "New Jersey",
        "nm": "New Mexico", "ny": "New York", "nc": "North Carolina", "nd": "North Dakota",
        "oh": "Ohio", "ok": "Oklahoma", "or": "Oregon", "pa": "Pennsylvania", "ri": "Rhode Island",
        "sc": "South Carolina", "sd": "South Dakota", "tn": "Tennessee", "tx": "Texas",
        "ut": "Utah", "vt": "Vermont", "va": "Virginia", "wa": "Washington",
        "wv": "West Virginia", "wi": "Wisconsin", "wy": "Wyoming"
    };

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const cardContainer = document.getElementById('cardContainer');
            rows.forEach((row, index) => {
                const cols = row.querySelectorAll('td');

                // Skip the timestamp (column 0) and adjust all columns accordingly
                const nameValue = cols[1]?.innerText.trim();
                const positionValue = cols[2]?.innerText.trim();
                const cityValue = cols[3]?.innerText.trim();
                let stateValue = cols[4]?.innerText.trim().toLowerCase();
                const contactPhoneValue = cols[5]?.innerText.trim();
                const contactEmailValue = cols[6]?.innerText.trim();
                const reviewLinkValue = cols[7]?.innerText.trim();
                const ratingValue = parseFloat(cols[8]?.innerText.trim());
                const imageUrl = cols[9]?.innerText.trim();

                if (index === 0 || !nameValue || !positionValue || !cityValue || !stateValue) {
                    return; // Skip header and rows with missing critical data
                }

                const displayStateValue = stateValue.replace(/\b\w/g, c => c.toUpperCase());

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
                state.innerHTML = `<strong>State:</strong> ${displayStateValue}`;
                card.appendChild(state);

                const contactPhone = document.createElement('p');
                contactPhone.innerHTML = `<strong>Phone:</strong> ${contactPhoneValue}`;
                card.appendChild(contactPhone);

                const contactEmail = document.createElement('p');
                contactEmail.innerHTML = `<strong>Email:</strong> ${contactEmailValue || 'n/a'}`;
                card.appendChild(contactEmail);

                const rating = document.createElement('p');
                rating.innerHTML = `<strong>Rating:</strong> <span class="${isNaN(ratingValue) ? '' : (ratingValue < 3 ? 'rating-red' : '')}">${isNaN(ratingValue) ? 'N/A' : ratingValue.toFixed(2)}</span>`;
                card.appendChild(rating);

                if (reviewLinkValue) {
                    const reviewButton = document.createElement('a');
                    reviewButton.href = reviewLinkValue;
                    reviewButton.target = '_blank';
                    reviewButton.className = 'review-button';
                    reviewButton.textContent = 'Leave Review';
                    card.appendChild(reviewButton);
                }

                cardContainer.appendChild(card);
            });

            filterCards();
            document.getElementById('searchInput').addEventListener('input', filterCards);
            document.getElementById('cityInput').addEventListener('input', filterCards);
            document.getElementById('stateInput').addEventListener('input', filterCards);
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityInput = document.getElementById('cityInput').value.toLowerCase();
    let stateInput = document.getElementById('stateInput').value.toLowerCase();

    if (stateInput.length === 2 && stateAbbreviations[stateInput]) {
        stateInput = stateAbbreviations[stateInput].toLowerCase();
    }

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
