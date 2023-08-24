import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import { salesPermonth, selectedSalesPermonth } from '../Api/invoice';
import BarChart from '../Chart';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getCurrentMonthInWords() {

    const currentDate = new Date();
    const currentMonthNumber = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonthNameAndYear = months[currentMonthNumber] + " " + currentYear

    return currentMonthNameAndYear;
}



function Dashboard() {

    const [dailySalesData, setDailySalesData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [currentMY, setCurrentMY] = useState(getCurrentMonthInWords());

    const navigate = useNavigate()

    const getSalesPermonthData = async () => {
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }

            const response = await salesPermonth(config);
            setDailySalesData(response.data)
        } catch (error) {
            console.error('Error fetching filtered daily sales data:', error);
            if (error.response.data.message = "Invalid Authorization") {
                navigate("/")
            }
        }
    }


    useEffect(() => {
        getSalesPermonthData()
    }, [])

    const fetchFilteredData = async () => {
        try {
            const token = await localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }

            if (selectedMonth && selectedYear) {
                const response = await selectedSalesPermonth(selectedYear, selectedMonth, config)
                console.log(response.data)
                setDailySalesData(response.data);
                setCurrentMY(months[selectedMonth - 1] + " " + selectedYear)
            }
        } catch (error) {
            console.error('Error fetching filtered daily sales data:', error);
        }
    };

    const handleFilterChange = () => {
        fetchFilteredData();
    };

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }


    return (
        <div className="dashboard">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container-fluid'>
                    <a className="navbar-brand" href="/landingpage">Inventory Billing App</a>
                    < button className='navbar-item btn btn-light' onClick={handleLogout}>Logout</button>
                </div>
            </nav >


            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Manage Products</h5>
                                <p className="card-text">Add, edit, and delete products in your inventory.</p>
                                <Link to="/products" className="btn btn-primary">Go to Products</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Invoice</h5>
                                <p className="card-text">Generate invoices for customer purchases.</p>
                                <Link to="/createinvoice" className="btn btn-primary">Create Invoice</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light text-center py-1">

            </div>
            <div className='Chartpage'>
                < BarChart dailySalesData={dailySalesData} selectedMonth={selectedMonth} selectedYear={selectedYear} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} handleFilterChange={handleFilterChange} currentMY={currentMY} />
            </div>

            <footer className="bg-light text-center py-3">
                {/* ... (footer content) */}
            </footer>
        </div >
    );
}

export default Dashboard;
