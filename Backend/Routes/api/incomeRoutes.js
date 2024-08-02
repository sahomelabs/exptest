const express = require('express');
const router = express.Router();
const Income = require('../../Models/Income'); // Adjust the path to your Income model
const User = require('../../Models/User'); // Import User model
const { authenticateToken } = require('../../Middleware/authMiddleware'); // Adjust path to your auth middleware

// Add income for a user
router.post('/', authenticateToken, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user._id;

  try {
    // Create new income entry
    const newIncome = new Income({ userId, amount });
    await newIncome.save();

    // Optionally, update user's income field
    await User.findByIdAndUpdate(userId, { $push: { income: newIncome._id } });

    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error adding income:', error.message);
    res.status(500).json({ message: 'Failed to add income', error: error.message });
  }
});

// Update income for a user
router.put('/', authenticateToken, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user._id;

  try {
    // Find and update income entry for the user
    const updatedIncome = await Income.findOneAndUpdate(
      { userId },
      { amount },
      { new: true, upsert: true } // upsert: true will create a new document if it doesn't exist
    );

    // Update user's income field
    await User.findByIdAndUpdate(userId, { $set: { income: updatedIncome._id } });

    res.status(200).json(updatedIncome);
  } catch (error) {
    console.error('Error updating income:', error.message);
    res.status(500).json({ message: 'Failed to update income', error: error.message });
  }
});

// Get income for a user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch all income entries for the user
    const incomes = await Income.find({ userId });
    res.status(200).json(incomes); // Return all income entries
  } catch (error) {
    console.error('Error fetching income:', error.message);
    res.status(500).json({ message: 'Failed to fetch income', error: error.message });
  }
});

module.exports = router;
