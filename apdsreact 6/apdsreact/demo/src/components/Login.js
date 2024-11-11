import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha'; 
import './Views/Login.css';

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/jwt-secret

function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); 
  const [showCaptcha, setShowCaptcha] = useState(false); 
  const [captchaToken, setCaptchaToken] = useState(null); 
  const navigate = useNavigate();
 
  const recaptchaSiteKey = '6LchiFgqAAAAAOS57cFPD81caw_Q3We9Hacy6kjL';
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check if captcha is required and not solved
    if (showCaptcha && !captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
 
    try {
      const response = await axios.post('/api/auth/login', {
        accountNumber,
        username,
        password,
        captchaToken, // Send captcha token to the backend 
      });
 
      sessionStorage.setItem("username", username);
      localStorage.setItem('username', username);

      localStorage.setItem('accountNumber', accountNumber);
      
      const uns = sessionStorage.getItem("username");

      const un = localStorage.getItem('username');

      alert(response.data.message + ": " + uns);
      setLoginAttempts(0);
      setCaptchaToken(null);
      setShowCaptcha(false);
 
      navigate('/Home');
    } catch (error) {
      console.error('Login error:', error);
 
      
      setLoginAttempts(prevAttempts => prevAttempts + 1);
 
      if (loginAttempts + 1 >= 5) {
        setShowCaptcha(true);
      }
 
      alert('Login failed: ' + (error.response?.data?.message || 'An unexpected error occurred'));
    }
  };
 
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); 
  };
 
  return (
<div className="login-background">
<div className="container">

<form onSubmit={handleSubmit}>
<div className="form-group">
<h1>Welcome to Thyme Bank</h1>
<h4>Please log in to continue</h4>
<label htmlFor="accountNumber">Account Number</label>
<input 
              type="text" 
              id="accountNumber"
              value={accountNumber} 
              onChange={(e) => setAccountNumber(e.target.value)} 
              placeholder="Account Number" 
              required 
            />
</div>
<div className="form-group">
<label htmlFor="username">Username</label>
<input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
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
              placeholder="Password" 
              required 
            />
</div>
         
          {showCaptcha && (
<ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleCaptchaChange}
            />
          )}
<button type="submit" className="btn-primary">Login</button>
</form>
<a href="/register">Dont have an Account? Register here</a>
<div className="separator">
<span>OR</span>
</div>
<button onClick={() => navigate('/admin/login')} className="btn-secondary">
<FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
          Admin Login
</button>
</div>
</div>
  );
}
 
export default Login;