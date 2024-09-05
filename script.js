document.addEventListener('DOMContentLoaded', function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOZ_RmjKIIyx_EeTdU-AyzdgMiRExLAHyx6tiJMfu1MnZ-mQRCmueAzEiVtcT9KJexmX0k7NjTzv4g/pubhtml';

    // Function to map state abbreviations to full names
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

                // Adjusted columns based on your current sheet structure
                const timestampValue = cols[0]?.innerText.trim();
                const nameValue = cols[1]?.innerText.trim();
                const positionValue = cols[2]?.innerText.trim();
                const cityValue = cols[3]?.innerText.trim();
                const stateValue = cols[4]?.innerText.trim();
                const phoneValue = cols[5]?.innerText.trim();
                const emailValue = cols[6]?.innerText.trim();
                const reviewLinkValue = cols[7]?.innerText.trim();
                let ratingValue = cols[8]?.innerText.trim();

                // Handling missing or non-numeric rating values
                if (!ratingValue || isNaN(parseFloat(ratingValue))) {
                    ratingValue = 'N/A';
                } else {
                    ratingValue = parseFloat(ratingValue).toFixed(2);
                }

                if (index === 0 || !nameValue || !positionValue || !cityValue || !stateValue) {
                    return; // Skip header and rows with missing critical data
                }

                const card = document.createElement('div');
                card.className = 'card';

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
                rating.innerHTML = `<strong>Rating:</strong> <span class="${ratingValue < 3 ? 'rating-red' : ''}">${ratingValue}</span>`;
                card.appendChild(rating);

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
            });
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityInput = document.getElementById('cityInput').value.toLowerCase();
    let stateInput = document.getElementById('stateInput').value.toLowerCase();

    // Check if the input is an abbreviation, and if so, map it to the full state name
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
