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
                const locationValue = cols[3]?.innerText.trim();

                if (index === 0 || !nameValue || !positionValue || !locationValue) {
                    return; // Skip header and rows with missing critical data
                }

                const card = document.createElement('div');
                card.className = 'card';

                const name = document.createElement('h2');
                name.textContent = nameValue;
                card.appendChild(name);

                const position = document.createElement('p');
                position.innerHTML = `<strong>Position:</strong> ${positionValue || 'N/A'}`;
                card.appendChild(position);

                const location = document.createElement('p');
                location.innerHTML = `<strong>Location:</strong> ${locationValue || 'N/A'}`;
                card.appendChild(location);

                const email = document.createElement('p');
                email.innerHTML = `<strong>Contact Email:</strong> ${cols[4]?.innerText.trim() || 'N/A'}`;
                card.appendChild(email);

                const rating = document.createElement('p');
                rating.innerHTML = `<strong>Rating:</strong> ${cols[6]?.innerText.trim() || 'No Ratings'}`;
                card.appendChild(rating);

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
