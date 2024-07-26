// Backend/Routes/api/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../../Models/Expense');
const User = require('../../Models/User');

// Define your routes here
router.get('/expenses/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('expenses');
    res.json(user.expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/expenses', async (req, res) => {
  const { userId, name, amount, categoryGroup, category, date, dueDate } = req.body;
  const expense = new Expense({ name, amount, categoryGroup, category, date, dueDate });

  try {
    const savedExpense = await expense.save();
    let user = await User.findById(userId);
    if (!user) {
      user = new User({ _id: userId, expenses: [] });
    }
    user.expenses.push(savedExpense);
    await user.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;