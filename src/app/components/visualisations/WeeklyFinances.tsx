// components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyFinancesChart = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Amount Spent',
                data: [30, 80, 40, 50, 70, 70, 50], // Example data
                borderRadius: 10,
                backgroundColor: '#9957B3',
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        indexAxis: 'x' as const, // Shift the label to the left side
        responsive: true,
        aspectRatio: 1, // Make the chart square
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true, // Use point style for legend
                    pointStyle: 'rectRounded', // Change point style to rounded square
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    drawOnChartArea: true, // Correct property to use
                    drawTicks: false,
                },
            },
            y: {
                grid: {
                    drawOnChartArea: true, // Correct property to use
                    drawTicks: false,
                },
                ticks: {
                    stepSize: 10, // Set the interval for ticks
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default WeeklyFinancesChart;
