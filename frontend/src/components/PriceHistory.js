import Chart from 'chart.js/auto';
import {useEffect, useRef } from 'react'
import {motion} from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";
import './PriceHistory.css'

export default function PriceHistory({priceHistory, setIsPriceHistory}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const handleClose = () => {
        setIsPriceHistory(false);
    };

    useEffect(() => {
        // Clean up previous chart instance
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Parse priceHistory into dates and prices
        const dates = [];
        const prices = [];
        if (Array.isArray(priceHistory)) {
            priceHistory.slice().reverse().forEach(item => {
                // Expecting format: "date=price"
                const [date, price] = item.split('=');
                dates.push(date);
                prices.push(Number(price));
            });
        }

        if (canvasRef.current && dates.length && prices.length) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Price',
                        data: prices,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0,0,255,0.1)',
                        tension: 0.2,
                        fill: true,
                        pointRadius: 4,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false }
                    },
                    scales: {
                        x: { title: { display: true, text: 'Date' } },
                        y: { 
                            title: { display: true, text: 'Price ($)' },
                            ticks: {
                                callback: (value) => {
                                    return value.toFixed(2)
                                }
                             }}
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [priceHistory]);


    return (
        <div className='screen-container'>
            <div className="history-container">
                <h1 className='title'>Price History:</h1>
                <canvas ref={canvasRef} width="400" height="200"></canvas>
                <IoCloseCircle className='history-closebtn' size = "30" onClick={handleClose}></IoCloseCircle>
            </div>
        </div>   
    )
}