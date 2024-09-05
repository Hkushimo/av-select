function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cityInput = document.getElementById('cityInput').value.toLowerCase();
    const stateInput = document.getElementById('stateInput').value.toLowerCase();

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const position = card.querySelector('p:nth-child(2)').textContent.toLowerCase(); // Position field
        const city = card.querySelector('p:nth-child(3)').textContent.toLowerCase(); // City field
        const state = card.querySelector('p:nth-child(4)').textContent.toLowerCase(); // State field

        // Log the fields being compared to troubleshoot filtering issues
        console.log(`Position: ${position}, City: ${city}, State: ${state}`);

        const matchesSearch = searchInput === "" || position.includes(searchInput);
        const matchesCity = cityInput === "" || city.includes(cityInput);
        const matchesState = stateInput === "" || state.includes(stateInput);

        // Log the results of the matches for each card
        console.log(`MatchesSearch: ${matchesSearch}, MatchesCity: ${matchesCity}, MatchesState: ${matchesState}`);

        if (matchesSearch && matchesCity && matchesState) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
