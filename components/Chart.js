
import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Chart(props) {
    if(props.chartType === 'Bar') {
    return <Bar data={props.chartData} type={props.chartType} />;
    }

    if(props.chartType === 'Pie') {
        return <Pie data={props.chartData} type={props.chartType} />;
    }

}

export default Chart;