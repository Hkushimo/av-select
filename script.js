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
                
                // Check if this row is the header or has an empty name
                const nameValue = cols[0]?.innerText.trim();
                if (!nameValue || nameValue.toLowerCase() === 'name') {
                    return; // Skip header and rows with empty "Name" field
                }

                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h2');
                name.textContent = nameValue;
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position:</strong> ${cols[1]?.innerText.trim() || 'N/A'}`;
                card.appendChild(position);

                const tags = document.createElement('p');
                tags.innerHTML = `<strong>Tags:</strong> ${cols[2]?.innerText.trim() || 'N/A'}`;
                card.appendChild(tags);

                const location = document.createElement('p');
                location.innerHTML = `<strong>Location:</strong> ${cols[3]?.innerText.trim() || 'N/A'}`;
                card.appendChild(location);

                const email = document.createElement('p');
                email.innerHTML = `<strong>Contact Email:</strong> ${cols[4]?.innerText.trim() || 'N/A'}`;
                card.appendChild(email);

                // Add the "Rating" field before the "Leave Review" button
                const ratingValue = cols[6]?.innerText.trim() || '0';
                const rating = document.createElement('p');
                rating.innerHTML = `<strong>Rating:</strong> ${ratingValue}`;
                card.appendChild(rating);

                // Create the "Leave Review" button with hyperlink
                const reviewLink = cols[5]?.innerText.trim();
                if (reviewLink) {
                    const reviewButton = document.createElement('a');
                    reviewButton.href = reviewLink;
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
