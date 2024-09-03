const sheetUrl = "https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/export?format=csv";
let laborers = [];

fetch(sheetUrl)
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.split("\n").map(row => row.split(","));
        // Assuming the first row contains headers
        const headers = rows[0].map(header => header.trim().toLowerCase());
        
        // Populate the laborers array
        laborers = rows.slice(1).map(row => {
            let laborer = {};
            headers.forEach((header, index) => {
                laborer[header] = row[index] ? row[index].trim().toLowerCase() : "";
            });
            return laborer;
        });

        console.log(laborers); // Check the parsed data
    })
    .catch(error => console.error("Error fetching data:", error));

function lookupLaborer() {
    const positionInput = document.getElementById('positionInput').value.toLowerCase();
    const location
