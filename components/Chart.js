
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Chart(props) {
    const backgroundColorTab = [
        "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF",
        "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB", "#FFCE56",
        "#2D8647", "#50AF95", "#f3ba2f", "#2a71d0", "#EC932F",
        "#3498db", "#e74c3c", "#1abc9c", "#9b59b6", "#34495e",
        "#f39c12", "#d35400", "#16a085", "#27ae60", "#8e44ad"
    ];

    let labelTitle = 'time'
    if(props.chartType === "Pie"){
        labelTitle = 'title'
    }
    const messagesData = {
        labels: props.chartData.map((data) => data[labelTitle]),
        datasets: [
            {
                label: props.label,
                data: props.chartData.map((data) => data.value),
                backgroundColor: backgroundColorTab.slice(0, props.chartData.length),
                borderColor: "grey",
                borderWidth: 2,
            },
        ],
    };

    if(props.chartType === 'Bar') {
        
    return <> <h2>{props.chartTitle}</h2><Bar data={messagesData} type={props.chartType} /> </>;
    
    }

    if(props.chartType === 'Pie') {
        return <> <h2>{props.chartTitle}</h2><Doughnut data={messagesData} type={props.chartType} /> </>;
        
    }

}

export default Chart;