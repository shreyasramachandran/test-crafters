import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type WeeklyExpenses = {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    sun: number;
};


type WeeklyFinancesChartProps = {
    weeklyExpenses: WeeklyExpenses;
};

const WeeklyFinancesChart: React.FC<WeeklyFinancesChartProps> = ({ weeklyExpenses }) => {
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Amount Spent',
                data: [
                    weeklyExpenses.mon,
                    weeklyExpenses.tue,
                    weeklyExpenses.wed,
                    weeklyExpenses.thu,
                    weeklyExpenses.fri,
                    weeklyExpenses.sat,
                    weeklyExpenses.sun,
                ],
                borderRadius: 10,
                backgroundColor: '#9957B3',
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        indexAxis: 'x' as const,
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    drawOnChartArea: true,
                    drawTicks: false,
                },
            },
            y: {
                grid: {
                    drawOnChartArea: true,
                    drawTicks: false,
                },
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default WeeklyFinancesChart;
