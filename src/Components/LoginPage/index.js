import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { login } from '../Api/user';

function LoginPage() {
    const Navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password })
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                Navigate('/landingpage');
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in');
        }
    };

    return (
        <div className='LoginPage' >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container-fluid'>
                    <a className="navbar-brand" href="/">Inventory Billing App</a>
                    <div className="navbar-brand">Welcome</div>
                </div>
            </nav>
            <div className="container">
                <div className="row justify-content-center mt-5 lh-lg">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Admin Login</div>
                            <div className="card-body">
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p style={{ color: "green" }}>Use Below Username and Password</p>
                <p><i>Username: <b>admin</b></i></p>
                <p><i>Password: <b>admin@123</b></i></p>
            </div>
            <footer className="bg-light text-center py-3 footer">
                <p>&copy; {new Date().getFullYear()} Inventory Billing App. Developed By Karthik T R</p>
            </footer>
        </div>
    );
}

export default LoginPage;
