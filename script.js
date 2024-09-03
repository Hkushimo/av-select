let laborers = []; // Initialize an empty array to store laborer data

const sheetUrl = "https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml";

fetch(sheetUrl)
    .then(response => response.text())
    .then(htmlText => {
        laborers = parseHTML(htmlText);
    })
    .catch(error => console.error("Error fetching data:", error));

function parseHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');

    if (table) {
        const rows = table.querySelectorAll('tr');
        const data = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            const rowData = Array.from(cells).map(cell => cell.textContent.trim());
            data.push(rowData);
        });

        return data; // Return the extracted data
    } else {
        console.error("No table found in the HTML.");
        return [];
    }
}

function lookupLaborer() {
    const positionInput = document.getElementById('positionInput').value.toLowerCase();
    const locationInput = document.getElementById('locationInput').value.toLowerCase();
    const tagsInput = document.getElementById('tagsInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    console.log("Search Inputs - Position:", positionInput, "Location:", locationInput, "Tags:", tagsInput); // Debugging

    // Assuming first row is the header and skipping it
    const filteredLaborers = laborers.slice(1).filter(laborer => {
        const [name, position, experience, location, email] = laborer;
        const matchesPosition = positionInput ? position.includes(positionInput) : true;
        const matchesLocation = locationInput ? location.includes(locationInput) : true;
        const matchesTags = tagsInput ? experience.includes(tagsInput) : true;
        return matchesPosition && matchesLocation && matchesTags;
    });

    console.log("Filtered Laborers:", filteredLaborers); // Debugging

    if (filteredLaborers.length > 0) {
        filteredLaborers.forEach(laborer => {
            const [name, position, experience, location, email] = laborer;
            resultDiv.innerHTML += `
                <p><strong>Name:</strong> ${name}<br>
                <strong>Position:</strong> ${position}<br>
                <strong>Experience:</strong> ${experience}<br>
                <strong>Location:</strong> ${location}<br>
                <strong>Email:</strong> ${email}</p>
            `;
        });
    } else {
        resultDiv.innerHTML = '<p>No laborers found matching the criteria.</p>';
    }
}
