const sheetUrl = "https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml";

fetch(sheetUrl)
    .then(response => response.text())
    .then(htmlText => {
        parseHTML(htmlText);
    })
    .catch(error => console.error("Error fetching data:", error));

function parseHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the table element in the parsed HTML
    const table = doc.querySelector('table');

    if (table) {
        const rows = table.querySelectorAll('tr');
        const data = [];

        // Loop through the rows and extract data
        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            const rowData = Array.from(cells).map(cell => cell.textContent.trim());
            data.push(rowData);
        });

        displayData(data); // Pass the extracted data to the display function
    } else {
        console.error("No table found in the HTML.");
    }
}

function displayData(data) {
    const container = document.getElementById('table-container');

    if (data.length > 0) {
        const table = document.createElement('table');

        data.forEach((row, index) => {
            const tr = document.createElement('tr');

            row.forEach(cellText => {
                const cell = index === 0 ? document.createElement('th') : document.createElement('td');
                cell.textContent = cellText;
                tr.appendChild(cell);
            });

            table.appendChild(tr);
        });

        container.appendChild(table);
    } else {
        container.textContent = 'No data found.';
    }
}
