'use client'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);


export default function Chart({active,complete,archive}) {
    const data = {
      labels: ['Active', 'Completed', 'Archive'],
      datasets: [
        {
          label: 'Projects',
          data: [active,complete,archive],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },

      ],
    };
  return <Bar data={data} />;
}
