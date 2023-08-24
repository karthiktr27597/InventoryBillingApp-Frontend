import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ value, name }) {

    const navigate = useNavigate()

    const handleClick = (e) => {
        if (e.target.value === "product") {
            navigate("/products")
        }
        if (e.target.value === "invoice") {
            navigate("/createinvoice")
        }

    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
            <div className='container-fluid'>
                <div className='d-flex gap-3'>
                    <a className="navbar-brand" href="/landingpage">Inventory Billing App</a>
                    <button className='navbar-item btn btn-light' value={value} onClick={(e) => handleClick(e)}>{name}</button>
                </div>
                <button className='navbar-item btn btn-light' onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar