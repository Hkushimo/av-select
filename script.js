const sheetUrl = "https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/export?format=csv";

fetch(sheetUrl)
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.split("\n").map(row => row.split(","));
        console.log(rows);
        // Process and display the rows as needed
    })
    .catch(error => console.error("Error fetching data:", error));

function parseGoogleSheetJSON(data) {
    const entries = data.feed.entry;
    return entries.map(entry => {
        return {
            name: entry['gsx$name']['$t'].toLowerCase(),
            position: entry['gsx$position']['$t'].toLowerCase(),
            experience: entry['gsx$experience']['$t'].toLowerCase(),
            location: entry['gsx$location']['$t'].toLowerCase(),
            email: entry['gsx$email']['$t']
        };
    });
}

function lookupLaborer() {
    const positionInput = document.getElementById('positionInput').value.toLowerCase();
    const locationInput = document.getElementById('locationInput').value.toLowerCase();
    const tagsInput = document.getElementById('tagsInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    console.log("Search Inputs - Position:", positionInput, "Location:", locationInput, "Tags:", tagsInput); // Debugging

    const filteredLaborers = laborers.filter(laborer => {
        const matchesPosition = positionInput ? laborer.position.includes(positionInput) : true;
        const matchesLocation = locationInput ? laborer.location.includes(locationInput) : true;
        const matchesTags = tagsInput ? laborer.experience.includes(tagsInput) : true;
        return matchesPosition && matchesLocation && matchesTags;
    });

    console.log("Filtered Laborers:", filteredLaborers); // Debugging

    if (filteredLaborers.length > 0) {
        filteredLaborers.forEach(laborer => {
            resultDiv.innerHTML += `
                <p><strong>Name:</strong> ${laborer.name}<br>
                <strong>Position:</strong> ${laborer.position}<br>
                <strong>Experience:</strong> ${laborer.experience}<br>
                <strong>Location:</strong> ${laborer.location}<br>
                <strong>Email:</strong> ${laborer.email}</p>
            `;
        });
    } else {
        resultDiv.innerHTML = '<p>No laborers found matching the criteria.</p>';
    }
}
