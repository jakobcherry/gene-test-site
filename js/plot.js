function updatePlot() {
    let gene = document.getElementById("gene").value;
    let tissue = document.getElementById("tissue").value;

    fetch(`data/${gene}.json`)
        .then(response => response.json())
        .then(data => {
            let trace = {
                x: data[tissue].x,
                y: data[tissue].y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'}
            };

            let layout = {
                title: `${gene} - ${tissue}`,
                xaxis: { title: "Variant" },
                yaxis: { title: "Value" }
            };

            Plotly.newPlot('plotDiv', [trace], layout);
        });
}

// Render default plot on page load
updatePlot();