// Backend/Routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Import the User model

// POST route for user signup
router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Basic validation
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required testing postman' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password }); // You should hash the password before saving

        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
