import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define an interface for the component props
interface PerformanceScores {
    correctAnswers: number;
    incorrectAnswers: number;
}

function OverviewPerformancePieChart(performanceScores: PerformanceScores) {
    const data = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [
            {
                data: [performanceScores.correctAnswers, performanceScores.incorrectAnswers],
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: ['#fff'],
                borderWidth: 2,
            }
        ]
    };

    const options = {
        plugins: {
            legend: {

                position: 'top' as const, // Position of legend
                labels: {
                    boxWidth: 20, // Width of the color box
                    padding: 20, // Padding between color boxes
                }
            },
            layout: {
                aspectRatio: 1,
                padding: {
                    top: 50, // Increase top padding
                    right: 20, // Increase right padding
                    bottom: 20, // Increase bottom padding
                    left: 20 // Increase left padding
                }
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
            responsive: true,
            maintainAspectRatio: false,
        },
        responsive: true, // Make sure the chart is responsive
        maintainAspectRatio: false, // Maintain the aspect ratio
    };

    return (
        <div style={{ width: '300px', height: '300px' }}>
            <Pie data={data} options={options} />
        </div>
    );
}

export default OverviewPerformancePieChart;
