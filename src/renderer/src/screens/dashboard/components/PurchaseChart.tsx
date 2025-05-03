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
import { PurchaseDataType } from '@renderer/types/types';
import { cn } from '@renderer/libs/utils';

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



interface PurchaseChartProps {
    purchases: PurchaseDataType[];
    setShowPurchaseGraph?: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
}

const PurchaseTrendChart: React.FC<PurchaseChartProps> = ({ purchases, setShowPurchaseGraph, title = "title" }) => {
    const [viewMode, setViewMode] = useState<'count' | 'price'>('price');

    // Process data for Chart.js
    const processChartData = () => {
        // Group by date
        const dateGroups: Record<string, { count: number; totalPrice: number }> = {};

        purchases.forEach(purchase => {
            const date = purchase.orderingDate;
            if (!dateGroups[date]) {
                dateGroups[date] = { count: 0, totalPrice: 0 };
            }
            dateGroups[date].count += 1;
            dateGroups[date].totalPrice += purchase?.totalPrice || 0;
        });

        // Sort dates chronologically
        const sortedDates = Object.keys(dateGroups).sort((a, b) =>
            new Date(a).getTime() - new Date(b).getTime()
        );

        return {
            labels: sortedDates,
            datasets: [
                {
                    label: viewMode === 'price' ? 'Total Purchase Amount' : 'Number of Purchases',
                    data: sortedDates.map(date =>
                        viewMode === 'price' ? dateGroups[date].totalPrice : dateGroups[date].count
                    ),
                    borderColor: 'rgb(79, 70, 229)',
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
                    ? 'Total Purchase Amount by Date'
                    : 'Number of Purchases by Date',
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
                    text: viewMode === 'price' ? 'Amount (₹)' : 'Number of Purchases'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        }
    };

    return (
        <div
            onDoubleClick={() => { setShowPurchaseGraph && setShowPurchaseGraph(false) }}
            className=" w-full h-full p-4 bg-neutral-800/50 text-white rounded-lg border border-neutral-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex">
                    <Button
                        onPress={() => setViewMode('price')}
                        label='Price'
                        className={cn('w-full px-3 hover:opacity-95', 
                            viewMode !== 'price' ? 'scale-90' : 'scale-80')}
                    />

                    <Button
                        onPress={() => setViewMode('count')}
                        label='Quantity'
                        className={cn('w-full px-3 hover:opacity-95', 
                            viewMode !== 'count'  ? 'scale-90' : "scale-80")}
                    />


                </div>
            </div>
            <div className="h-full w-full">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
};

export default PurchaseTrendChart;