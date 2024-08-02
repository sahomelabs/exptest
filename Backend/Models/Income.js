// /Users/danielcozy/Desktop/expen-prod/exptest/Backend/Models/Income.js
const mongoose = require('mongoose');

// Define the schema for the Income model
const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Reference to the User model
  },
  amount: {
    type: Number,
    default: 0,
    min: 0  // Ensure amount is a non-negative number
  }
}, { 
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

// Index the userId field for better query performance
incomeSchema.index({ userId: 1 });

// Create and export the Income model
module.exports = mongoose.model('Income', incomeSchema);
