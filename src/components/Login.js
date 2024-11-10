import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Login = ({ onLogin, onToggleSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('https://movie-recommendation-1-nkro.onrender.com/api/auth/login', {
                email,
                password,
            });
    
            if (response.status === 200) {
                const userId = response.data.userId; // Assume API returns userId
                localStorage.setItem('userId', userId); // Store user ID
                localStorage.setItem('token', response.data.token); // Store token if needed
                onLogin(userId); // Pass userId back to App to set as logged in
            }
        } catch (err) {
            setError('Invalid credentials or server error');
            console.error(err);
        }
    
    
    };
    return (
        <div
            className="container-fluid d-flex vh-100 justify-content-center align-items-center"
            style={{
                
            }}
        >
            <div className="card p-4 shadow-lg login-card">
                <h3 className="text-center text-dark mb-4">Login</h3>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label"><i class="bi bi-envelope"></i> Email ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"><i class="bi bi-house-lock"></i> Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100 mt-3">
                        Login
                    </button>

                    <p className="text-center mt-3">
                       <small> Don't have an account? </small> <button className="btn-link text-success border-0 bg-transparent text-decoration-underline" onClick={onToggleSignUp}>Sign Up</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;