require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./Backend/Routes/api/authRoutes'); // Adjust path if needed
const expenseRoutes = require('./Backend/Routes/api/expenseRoutes'); // Adjust path if needed

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
