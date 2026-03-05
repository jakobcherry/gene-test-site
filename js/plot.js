let currentData = {};

function updateTissues() {
    let gene = document.getElementById("gene").value;

    fetch(`data/${gene}.json`)
        .then(response => response.json())
        .then(data => {
            currentData = data;

            let tissueSelect = document.getElementById("tissue");
            tissueSelect.innerHTML = "";

            for (let tissue in data) {
                let option = document.createElement("option");
                option.value = tissue;
                option.text = tissue;
                tissueSelect.appendChild(option);
            }

            // Plot first tissue automatically
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