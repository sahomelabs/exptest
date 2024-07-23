const express = require('express');
const router = express.Router();
const Income = require('../Models/Income');
const authenticate = require('../middleware/authenticate');

// Add a new income
router.post('/', authenticate, async (req, res) => {
  const { source, amount } = req.body;

  try {
    const income = new Income({
      userId: req.user.id,
      source,
      amount
    });
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all income for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
