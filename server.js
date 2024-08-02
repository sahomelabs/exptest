require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow requests from the frontend domain
const corsOptions = {
  origin: 'https://grow--wise.com', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS configuration
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./Backend/Routes/api/authRoutes'); // Adjust path if needed
const expenseRoutes = require('./Backend/Routes/api/expenseRoutes'); // Adjust path if needed
const incomeRoutes = require('./Backend/Routes/api/incomeRoutes'); // Adjust path if needed

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.send('Server is up and running');
});

// MongoDB connection
const uri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
