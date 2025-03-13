import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);
const options = {
    responsive: true,
    scales: {
        x: {
            display: true,
        },
        y:{
            display:false
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let value = context.raw;
                    return `${value}%`;
                }
            }
        }
    },
};
function BarChart({ activityData }) {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Activities',
                display:false,
                data: activityData ,
                fill: false,
                 backgroundColor: 'rgb(204, 255, 51)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius:20,
                borderWidth: 2,
            },
        ],
    };
    return (
        <div className='h-full text-white w-full bg-[#121212] rounded-xl border-1 p-2'>
            <Bar data={data} options={options}/>
        </div>
    );
}

export default BarChart;
