import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Views/AdminLogin.css'; 


function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/auth/admin-login', { username, password });
            const token = response.data.token;
            localStorage.setItem('adminToken', token);  
            localStorage.setItem('adminusername', username); 
            setMessage('Login successful');
            // Redirect to AllPayments page after successful login
            navigate('/all-payments');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <div className="image-container"></div>
                <div className="login-container">
                {/* Round image for the profile or logo */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <img 
                            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
                            alt="Profile"
                            className="profile-image" 
                        />
                        <h2 className="login-title">Welcome Back!</h2>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>{message}</p>
                <div className="return-link">
                    {}
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
