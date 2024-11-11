const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
const { validateRegistration, validateLogin, checkValidationResult } = require('../middleware/validation');
const ExpressBrute = require('express-brute');
 
 
const JWT_SECRET = process.env.JWT_SECRET;
 
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 300
});
 
// Admin Login
router.post('/admin-login', async (req, res) => {
    console.log("Received registration request:", req.body);
    next();
}, bruteforce.prevent, validateRegistration, checkValidationResult, async (req, res) =>  {
    const { username, password } = req.body;
    console.log(`Registration attempt for username: ${username}`);
 
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ error: 'Invalid credentials' });
 
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });
 
        const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
 
module.exports = router;