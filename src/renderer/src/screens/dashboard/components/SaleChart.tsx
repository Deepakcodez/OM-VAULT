import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import Button from '@renderer/components/ui/Button';
import { SalesDataType } from '@renderer/types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface SalesChartProps {
  sales: SalesDataType[];
  setShowSalesGraph?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

const SalesTrendChart: React.FC<SalesChartProps> = ({ sales, setShowSalesGraph, title = "Sales Trend" }) => {
  const [viewMode, setViewMode] = useState<'count' | 'price'>('price');

  // Process data for Chart.js
  const processChartData = () => {
    // Group by date
    const dateGroups: Record<string, { count: number; totalPrice: number }> = {};

    sales.forEach(sale => {
      const date = sale?.orderingDate; // Assuming your sales data has saleDate field
      if (!dateGroups[date]) {
        dateGroups[date] = { count: 0, totalPrice: 0 };
      }
      dateGroups[date].count += 1;
      dateGroups[date].totalPrice += sale?.totalPrice || 0; // Assuming totalAmount field
    });

    // Sort dates chronologically
    const sortedDates = Object.keys(dateGroups).sort((a, b) =>
      new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      labels: sortedDates,
      datasets: [
        {
          label: viewMode === 'price' ? 'Total Sales Amount' : 'Number of Sales',
          data: sortedDates.map(date =>
            viewMode === 'price' ? dateGroups[date].totalPrice : dateGroups[date].count
          ),
          borderColor: 'rgb(16, 185, 129)', // Green color for sales
          backgroundColor: 'white',
          tension: 0.3,
          fill: true
        }
      ]
    };
  };

  const chartData = processChartData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: viewMode === 'price'
          ? 'Total Sales Amount by Date'
          : 'Number of Sales by Date',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return viewMode === 'price'
              ? `${label}: ₹${value.toLocaleString()}`
              : `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: viewMode === 'price' ? 'Amount (₹)' : 'Number of Sales'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div
      onDoubleClick={() => { setShowSalesGraph && setShowSalesGraph(false) }}
      className="w-full h-full p-4 bg-neutral-800/50 text-white rounded-lg border border-neutral-700"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex ">
          <Button
            onPress={() => setViewMode('price')}
            label='Price'
            className={`w-full px-3 hover:opacity-95 ${viewMode === 'price' ? 'scale-90' : 'scale-80'}`}
          />
          <Button
            onPress={() => setViewMode('count')}
            label='Quantity'
            className={`w-full px-3 hover:opacity-95 ${viewMode === 'count' ? 'scale-90' : 'scale-80'}`}
          />
        </div>
      </div>
      <div className="h-full w-full">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default SalesTrendChart;