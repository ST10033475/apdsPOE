const express = require('express');
const router = express.Router();
const Payment = require('../models/Pay');

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/ci-cd


// POST endpoint to add new payment
router.post('/', async (req, res) => {
    const { username, amount, currency, recipient, swiftCode, paymentReference } = req.body;

    try {
        // Create a new payment instance
        const newPayment = new Payment({
            username,
            amount,
            currency,
            recipient,
            swiftCode,
            paymentReference,
        });

        // Save the payment to the database
        const savedPayment = await newPayment.save();

        // Respond with the saved payment data
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ message: 'Error adding payment' });
    }
});

router.put('/:id', async (req, res) => {
  const { status } = req.body; // Status should be passed in the body
  try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
          return res.status(404).json({ message: 'Payment not found' });
      }

      payment.status = status; // Update the status
      await payment.save();

      res.status(200).json(payment);
  } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ message: 'Error updating payment status' });
  }
});
// GET endpoint to retrieve all payments
router.get('/', async (req, res) => {
    try {
      const payments = await Payment.find(); // Fetch all payments from the database
      res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ message: 'Error fetching payments' });
    }
  });

module.exports = router;