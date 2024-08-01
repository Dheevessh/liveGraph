const ctx = document.getElementById('liveGraph').getContext('2d');

const data = {
    labels: [], // Initial empty labels
    datasets: [{
        label: 'Live Data',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: [], // Initial empty data
        fill: true
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Time'
                },
                ticks: {
                    callback: function(value) {
                        return new Date(value).toLocaleTimeString(); // Format X-axis labels as time
                    }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Celsius'
                }
            }
        },
        animation: {
            duration: 0 // Disable animations for live updates
        }
    }
};

const chart = new Chart(ctx, config);

// Function to generate random data for demonstration
function generateRandomData() {
    return Math.random() * 100;
}

// Function to update the graph with new data
function updateGraph() {
    const now = Date.now();
    const label = now;
    const value = generateRandomData();

    if (data.labels.length >= 20) {
        data.labels.shift(); // Remove the first label
        data.datasets[0].data.shift(); // Remove the first data point
    }

    data.labels.push(label);
    data.datasets[0].data.push({ x: label, y: value });

    chart.update();
}

// Update the graph every second
setInterval(updateGraph, 1000);
