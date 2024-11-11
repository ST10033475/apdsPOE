import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Views/MyPayments.css';
 
const axiosInstance = axios.create({
  baseURL: '/api',
});
 
function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const loggedInUsername = localStorage.getItem('username');
        if(loggedInUsername !=null){
        const response = await axiosInstance.get('/pay');
       
        const filteredPayments = response.data.filter(pay => pay.username === loggedInUsername);
        setPayments(filteredPayments);}
      
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Error fetching payments');
      }
    };
 
    fetchPayments();
  }, []);
  
  const loggedInUsername = localStorage.getItem('username');
if(loggedInUsername!=null)
  
  return (
    <div className="payments-background">
    <div className="payments-list-container">
      <h1>Your Payments</h1>
      {error && <div className="error-message">{error}</div>}
 
      {payments.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Currency</th>
              <th>Recipient</th>
              <th>SWIFT Code</th>
              <th>Reference</th>
              <th>Status</th> {}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.recipient}</td>
                <td>{payment.swiftCode}</td>
                <td>{payment.paymentReference}</td>
                <td>{payment.status}</td> {}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No payments found.</div>
      )}
    </div>
    </div>
  );

else{
  return (
 
    <div className="Home-background">
      <div className="home-container">
        <h1>Oops, looks like youre not logged in, please go to the login screen.</h1>
       
       
      </div>
    </div>
  );
}}
export default MyPayments;