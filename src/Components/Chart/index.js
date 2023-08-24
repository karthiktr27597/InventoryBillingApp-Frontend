import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import "./Chart.css";


function BarChart({ dailySalesData, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear, handleFilterChange, currentMY }) {


    const chartData = {
        labels: dailySalesData.map(day => `${day._id.day}`),
        datasets: [
            {
                label: 'Total Sales Amount',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: dailySalesData.map(day => day.totalAmount)
            }
        ]
    };


    return (
        <div>
            <div className="filter-form mt-3">
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className='me-1'>
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    {/* Add options for other months */}
                </select>
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className='me-1'>
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    {/* Add options for other years */}
                </select>
                <button onClick={handleFilterChange}>Apply Filter</button>
            </div>
            <div className="SalesChart" style={{ alignContent: "center", margin: "3vh auto", width: "80%" }}>
                <h3>Daily Sales Chart of {currentMY}</h3>
                <Bar data={chartData} />
            </div>
        </div>
    )
}

export default BarChart