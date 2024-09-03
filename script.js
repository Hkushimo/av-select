document.addEventListener('DOMContentLoaded', function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1p5EUNGud_FE5gvlYZqr72IhifttLZEc-FNgwFbR0m1U/pubhtml';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');

            const tableBody = document.getElementById('tableBody');
            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const cols = row.querySelectorAll('td');
                const tr = document.createElement('tr');

                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = col.innerText;
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching the Google Sheets data:', error));
});

function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.getElementById('dataTable').getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const position = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        const tags = rows[i].getElementsByTagName('td')[2].textContent.toLowerCase();
        const location = rows[i].getElementsByTagName('td')[3].textContent.toLowerCase();

        if (position.includes(input) || tags.includes(input) || location.includes(input)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
