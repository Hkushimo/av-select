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

        // Match position, location, and tags/experience based on the presence of the search term
        const matchesPosition = position.includes(positionInput);
        const matchesLocation = location.includes(locationInput);
        const matchesTags = experience.includes(tagsInput);

        // Only one of the criteria needs to match
        return matchesPosition || matchesLocation || matchesTags;
    });

    console.log("Filtered Laborers:", filteredLaborers); // Debugging

    if (filteredLaborers.length > 0) {
        filteredLaborers.forEach(laborer => {
            const [name, position, experience, location, email] = laborer;
            resultDiv.innerHTML += `
                <div style="margin-bottom: 15px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Position:</strong> ${position}</p>
                    <p><strong>Experience:</strong> ${experience}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Email:</strong> ${email}</p>
                </div>
            `;
        });
    } else {
        resultDiv.innerHTML = '<p>No laborers found matching the criteria.</p>';
    }
}
