// controllers/incomeController.js or similar
const User = require('../models/User'); // Adjust the path as needed

const updateUserIncome = async (req, res) => {
  const { userId } = req.params;
  const { income } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.income = income;
    await user.save();

    res.json({ income: user.income });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating income', error });
  }
};

module.exports = { updateUserIncome };
