// /Users/danielcozy/Desktop/expen-prod/exptest/Backend/Models/Income.js
const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Income', IncomeSchema);
