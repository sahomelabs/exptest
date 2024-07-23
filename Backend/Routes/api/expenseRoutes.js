const express = require('express');
const router = express.Router();
const Expense = require('../Models/Expense');
const authenticate = require('../middleware/authenticate');

// Add a new expense
router.post('/', authenticate, async (req, res) => {
  const { name, amount, categoryGroup, category, date, dueDate } = req.body;

  try {
    const expense = new Expense({
      userId: req.user.id,
      name,
      amount,
      categoryGroup,
      category,
      date,
      dueDate,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all expenses for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
