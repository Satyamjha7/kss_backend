const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

router.get('/', (req, res) => {
    res.send('Subscription route working!');
});

router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const newSubscription = new Subscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'This email is already subscribed.' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

module.exports = router;
