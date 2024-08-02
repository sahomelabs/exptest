// Backend/models/User.js

const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  income: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income'
  }]
});

// Create and export the User model
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
