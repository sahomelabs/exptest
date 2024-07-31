// Backend/Routes/api/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../../Models/Expense');
const User = require('../../Models/User');
const { verifyToken } = require('../../middleware/authMiddleware');

// Get expenses for a user
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('expenses');
    res.json(user.expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
router.post('/', verifyToken, async (req, res) => {
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

// Edit an expense
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;