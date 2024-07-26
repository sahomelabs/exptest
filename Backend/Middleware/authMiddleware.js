const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded user info to the request object
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = { verifyToken };
