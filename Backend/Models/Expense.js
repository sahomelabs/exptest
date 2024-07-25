// backend/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  categoryGroup: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Make userID optional
  },
});

module.exports = mongoose.model('Expense', expenseSchema);

