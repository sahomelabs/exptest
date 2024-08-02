const express = require('express');
const router = express.Router();
const Income = require('../../Models/Income'); // Correct path to the Income model
const User = require('../../Models/User'); // Ensure you have the correct path to your User model

// Add income for a user
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newIncome = new Income({ amount });
    await newIncome.save();

    user.income = amount; // Ensure this field exists in your User model
    await user.save();

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit income for a user
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.income = amount; // Ensure this field exists in your User model
    await user.save();

    res.status(200).json({ income: user.income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get income for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ income: user.income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all incomes (for debugging or admin purposes)
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get income by ID (for debugging or admin purposes)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;