document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById("submitButton");

    if (myButton) {
        myButton.addEventListener('click', clicked);
    }

    fetchJSONData(); // load JSON when page starts
});

let erisData = null;

async function fetchJSONData() {
    try {
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        erisData = await response.json();
        console.log("Data loaded:", erisData);

    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

function clicked() {
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();

    filterData(name, id);

    document.getElementById("name").value = '';
    document.getElementById("id").value = '';
}

function filterData(name, id) {
    const resultsBox = document.getElementById("resultsBox");

    resultsBox.innerHTML = "";

    if (!erisData) {
        resultsBox.innerHTML = "<p>Loading data... please try again.</p>";
        return;
    }

    const result = erisData.People.find(item => 
        item.name.toLowerCase() === name.toLowerCase() &&
        item.id.toString() === id
    );

    if (result) {
    resultsBox.innerHTML = `
        <div class="result-card success">
            <h2>✔ User Found</h2>
            <p><strong>Name:</strong> ${result.name}</p>
            <p><strong>ID:</strong> ${result.id}</p>
            <p><strong>Math:</strong> ${result.math || "N/A"}</p>
            <p><strong>Reading:</strong> ${result.reading || "N/A"}</p>
            <p><strong>Writing:</strong> ${result.writing || "N/A"}</p>
            <p><strong>Logic:</strong> ${result.logic || "N/A"}</p>
            <p><strong>Fitness:</strong> ${result.fitness || "N/A"}</p>
            <p><strong>Class:</strong> ${result.class || "N/A"}</p>
            <p><strong>Wage:</strong> $${result.wage || "N/A"}</p>
            <p><strong>Job:</strong> ${result.job || "N/A"}</p>
        </div>
    `;
    } else {
    resultsBox.innerHTML = `
        <div class="result-card error">
            <h2>✖ No Match</h2>
            <p>User not found. Check your name and ID.</p>
        </div>
    `;
}
}
