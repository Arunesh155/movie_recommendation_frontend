import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = ({ onSignUp,onToggleSignUp  }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            const response = await axios.post('https://movie-recommendation-1-nkro.onrender.com/api/auth/register', {
                email,
                username,
                mobile,
                password,
            });

            if (response.status === 201) {
                onSignUp();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Sign-up failed');
            console.error(err);
        }
    };

    const handleBack = () => {
       // Go back to the login screen
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{
               
            }}
        >
            <div
                className="card p-3 shadow-lg"
                style={{
                    maxWidth: '300px', // Reduced card width
                    width: '100%',
                    padding: '15px', // Reduced padding for compact look
                    background: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
                    backdropFilter: 'blur(8px)',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    color: '#333',
                    background: 'linear-gradient(360deg, rgba(196,215,115,1) 0%, rgba(254,149,93,1) 100%)'
                    
                }}
            >   <div className='row'>
                    <div className='col-1' onToggleSignUp={handleBack}>
                        <i class="bi bi-arrow-left-circle-fill"></i>
                    </div>
                    <div className='col'>
                     <h4 className="text-center text-dark mb-3" style={{ fontSize: '1.2rem' }}>
                        Create an account
                    </h4>
                    </div>
            </div>
                

                {error && <div className="alert alert-danger text-center" style={{ fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSignUp}>
                    <div className="mb-2">
                        <label className="form-label"><i class="bi bi-envelope-fill"></i> Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                            required
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label"><i class="bi bi-person-circle"></i> Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label"> <i class="bi bi-phone"></i> Mobile</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="form-control"
                            placeholder="Mobile"
                            required
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label"><i class="bi bi-key-fill"></i> Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="form-label"> <i class="bi bi-key-fill"></i> Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm"
                            required
                            style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100 mt-2" style={{ padding: '0.5rem', fontSize: '0.9rem' }}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;