import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Chart, Title } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import React from 'react';

// Register required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, zoomPlugin);

// TypeScript Interfaces for Data
interface LineChartData {
    question: string;
    timeTaken: number;
}

interface LineChartProps {
    data: LineChartData[];
}

// Chart.js Line Chart Component
function TimeTakenPerQuestion({ data }: LineChartProps) {
    const labels = data.map(d => d.question);
    const values = data.map(d => d.timeTaken);

    const chartData: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Time Taken per Question (seconds)',
                data: values,
                fill: false,
                borderColor: '#888888', // Grey line color
                tension: 0.4, // Smoother curve
                pointBackgroundColor: '#6da39e', // Light green point color
                pointHoverRadius: 10, // Increase hover radius
                pointRadius: 7, // Increase point radius
                backgroundColor: 'rgba(144, 238, 144, 0.3)', // Light green background for line area
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Time Taken per Question',
                font: {
                    size: 20,
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
                color: '#333', // Title color
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker tooltip background
                titleFont: {
                    size: 14,
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
                bodyFont: {
                    size: 12,
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
            },
            legend: {
                display: false, // Remove legend
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Question',
                    font: {
                        size: 16,
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    },
                    color: '#333', // X-axis title color
                },
                grid: {
                    display: false, // Hide gridlines on x-axis
                },
                ticks: {
                    color: '#555', // X-axis ticks color
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Time Taken (seconds)',
                    font: {
                        size: 16,
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    },
                    color: '#333', // Y-axis title color
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Light grey gridlines
                },
                ticks: {
                    color: '#555', // Y-axis ticks color
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default TimeTakenPerQuestion;
