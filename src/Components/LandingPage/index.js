import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Custom CSS file for styling

function LandingPage() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container-fluid'>
          <a className="navbar-brand" href="/landingpage">Inventory Billing App</a>
          {token ? < button className='navbar-item btn btn-light' onClick={handleLogout}>Logout</button> :
            < button className='navbar-item btn btn-info active' onClick={handleLogout}>Login</button>
          }
        </div>
      </nav>

      <header className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">Welcome to Inventory Billing</h1>
          <p className="lead">Efficiently manage your inventory and billing processes.</p>
          <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Inventory Management</h2>
            <p>Keep track of your products, manage quantities, and organize your inventory effectively.</p>
          </div>
          <div className="col-md-4">
            <h2>Billing & Invoicing</h2>
            <p>Create invoices, track customer purchases, and manage billing processes seamlessly.</p>
          </div>
          <div className="col-md-4">
            <h2>User-Friendly Interface</h2>
            <p>Intuitive and easy-to-use interface designed to streamline your workflow.</p>
          </div>
        </div>
      </div>

      <footer className="bg-light text-center py-3 footer">
        <p>&copy; {new Date().getFullYear()} Inventory Billing App. Developed By Karthik T R</p>
      </footer>
    </div>
  );
}

export default LandingPage;
