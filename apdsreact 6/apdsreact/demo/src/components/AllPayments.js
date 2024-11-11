import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Views/AllPayments.css';

const axiosInstance = axios.create({
  baseURL: '/api',
});

function AllPayments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get('/pay');
        console.log('API Response:', response.data); // Log the full response

        // Filter payments to only show those with status 'Pending'
        const pendingPayments = response.data.filter(payment => payment.status === 'pending');
        console.log('Pending Payments:', pendingPayments); // Log the filtered pending payments

        // Ensure we're updating state correctly with the filtered data
        setPayments(pendingPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Error fetching payments');
      }
    };

    fetchPayments();
  }, []); // Run only once on component mount

  const handleApprove = async (paymentId) => {
    try {
      // Update the status to 'Approved' on the backend
      await axiosInstance.put(`/pay/${paymentId}`, { status: 'Approved' });

      // Update the local state to reflect the change in status
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment._id === paymentId ? { ...payment, status: 'Approved' } : payment
        )
      );
    } catch (error) {
      console.error('Error approving payment:', error);
      setError('Error approving payment');
    }
  };

  const handleReject = async (paymentId) => {
    try {
      // Update the status to 'Rejected' on the backend
      await axiosInstance.put(`/pay/${paymentId}`, { status: 'Rejected' });

      // Update the local state to reflect the change in status
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment._id === paymentId ? { ...payment, status: 'Rejected' } : payment
        )
      );
    } catch (error) {
      console.error('Error rejecting payment:', error);
      setError('Error rejecting payment');
    }
  };

  const loggedInUsername = localStorage.getItem('adminusername');
  if(loggedInUsername !=null){
    return (
      <div className="allpay-background">
        <h1 className="allpay-heading">Payments</h1>
        {error && <div className="allpay-error-message">{error}</div>}

        {payments.length > 0 ? (
          <table className="allpay-payments-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Currency</th>
                <th>Recipient</th>
                <th>SWIFT Code</th>
                <th>Reference</th>
                <th>Status</th> {/* Status column */}
                <th>Action</th> {/* Column for buttons */}
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
                  <td>{payment.status}</td>
                  <td>
                    <button className="allpay-button" onClick={() => handleApprove(payment._id)}>
                      Approve
                    </button>
                    <button className="allpay-reject-button" onClick={() => handleReject(payment._id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="allpay-no-payments-message">No pending payments found.</div>
        )}
      </div>
      
    );
  }

  else {
    return (
      <div className="allpay-home-background">
        <div className="allpay-home-container">
          <h1>Oops, looks like you're not logged in, please go to the login screen.</h1>
        </div>
      </div>
    );
  }
}



export default AllPayments;
