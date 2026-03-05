let currentData = {};

function updateTissues() {
    let gene = document.getElementById("gene").value;
    console.log("Selected gene:", gene);

    const jsonPath = `data/${gene}.json`;
    console.log("Fetching JSON from:", jsonPath);

    fetch(jsonPath)
        .then(response => {
            console.log("Fetch response:", response);
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        })
        .then(data => {
            console.log("Loaded JSON data:", data);
            currentData = data;

            let tissueSelect = document.getElementById("tissue");
            tissueSelect.innerHTML = "";

            for (let tissue in data) {
                console.log("Adding tissue:", tissue);
                let option = document.createElement("option");
                option.value = tissue;
                option.text = tissue;
                tissueSelect.appendChild(option);
            }

            updatePlot();
        })
        .catch(error => {
            console.error("Error loading JSON for gene:", gene, error);
        });
}

function updatePlot() {
    let tissue = document.getElementById("tissue").value;
    if (!tissue || !currentData[tissue]) return;

    let trace = {
        x: currentData[tissue].x,
        y: currentData[tissue].y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' }
    };

    let layout = {
        title: `${document.getElementById("gene").value} - ${tissue}`,
        xaxis: { title: "Variant" },
        yaxis: { title: "Value" }
    };

    Plotly.newPlot('plotDiv', [trace], layout);
}

// Initialize page on load
updateTissues();