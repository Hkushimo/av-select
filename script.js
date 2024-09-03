document.addEventListener('DOMContentLoaded', function() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQSR7y1JIpzVBlA7MsWqkRJKIoHtQ6MQQOwcrs88Gvj76nv2Ykg0xuN0l6pDW0AKrsiJ8oK8aVQSVAt/pub?gid=0&single=true&output=tsv')
        .then(response => response.text())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            const rows = data.split('\n');
            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const cols = row.split('\t');
                const tr = document.createElement('tr');
                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = col;
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
