'use client'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { AppContext } from './Context';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {
    const {totalEarning,totalExpenses,netProfit} = useContext(AppContext)
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'Calculations',
          data: [totalEarning,totalExpenses,netProfit],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverOffset: 4,
        },
      ],
    };
  return <Pie data={data} />;
}
