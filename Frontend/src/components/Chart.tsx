"use client"
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LineElement, LinearScale, PointElement } from 'chart.js';


interface Stock {
    id: number,
    datetime: string,
    close: number,
    high: number,
    low: number,
    open: number,
    volume: number,
    instrument: string
}

const StockAreaChart = ({ all_stock} : {all_stock:Stock[]}) => {
    // Extract the necessary data from the all_stock array
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(PointElement)
    Chart.register( LineElement)

    const labels = all_stock.map((stock) => stock.datetime.slice(0,10));
    const data = all_stock.map((stock) => stock.close);
  
    // Set the chart configuration
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Stock Prices',
          data: data,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    // Set the chart options
    const chartOptions = {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'DateTime',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Stock Price',
          },
        },
      },
    };
  
    return (
        <div className="flex flex-col md:flex-row">
          <div className="w-full 4 p-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

        </div>
    );
  };
  
  export default StockAreaChart;
  