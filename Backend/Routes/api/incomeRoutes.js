// /Users/danielcozy/Desktop/expen-prod/exptest/Backend/Routes/api/incomeRoutes.js
const express = require('express');
const router = express.Router();
const Income = require('../../Models/Income'); // Correct path to the Income model

// Add income
router.post('/', async (req, res) => {
  const { amount } = req.body;
  try {
    const newIncome = new Income({ amount });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit income
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const updatedIncome = await Income.findByIdAndUpdate(id, { amount }, { new: true });
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all incomes
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
