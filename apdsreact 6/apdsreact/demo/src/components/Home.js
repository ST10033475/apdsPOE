import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Views/Home.css'; // Ensure you import the CSS file
 
function Home() {
  const navigate = useNavigate(); // Initialize the navigate function
 
  const handleLogout = () => {
    sessionStorage.removeItem('username');
    localStorage.removeItem('username');
     navigate('/login');
  }
  const loggedInUsername = localStorage.getItem('username');
  if(loggedInUsername !=null){
  return (
 
    <div className="Home-background">
      <div className="home-container">
        <h1>Thyme Home</h1>
        <div className="button-container">
          <button
            className="big-button"
            style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/419466/screenshots/7187243/media/993dc71269f5ab2a9faff9fe9db69a60.gif)' }}
            onClick={() => navigate('/recipients')} // Navigate to the Recipients page
          >
            <span>RECIPIENTS</span>
          </button>
          <button
            className="big-button"
            style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1523313/screenshots/13591454/media/b5c05bf8f1512759f199bdf613995297.gif)' }}
            onClick={() => navigate('/pay-portal')} // Navigate to the Pay Portal page
          >
               <span>PAY PORTAL</span>
            </button>

            <button
              className="big-button"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/846207/screenshots/6637248/invoice_receipt_animation.gif)'
              }}
              onClick={() => navigate('/my-payments')} // Navigate to the My Payments page
            >
              <span>MY PAYMENTS</span>
            </button>

          </div>
          <button onClick={handleLogout} className="small-button">
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home-background">
        <div className="home-container">
          <h1>Oops, looks like you're not logged in, please go to the login screen.</h1>
        </div>
      </div>
    );
  }
}

export default Home;