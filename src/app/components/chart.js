'use client'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function Chart({active,complete,archive}) {
    const data = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Dashboard Details',
          data: [active,complete,archive],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  return <Line data={data} />;
}
