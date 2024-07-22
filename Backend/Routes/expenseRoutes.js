// backend/routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('./models/Expense');

// Add expense
router.post('/', async (req, res) => {
    const { name, amount, categoryGroup, category, date, dueDate } = req.body;
    try {
        const newExpense = new Expense({ name, amount, categoryGroup, category, date, dueDate });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Edit expense
router.put('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete expense
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
