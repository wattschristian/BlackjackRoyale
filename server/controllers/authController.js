const UserModel = require('../models/User');
const crypto = require('crypto');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const hash = crypto.createHash('md5').update(password).digest('hex');
    if (hash === user.passwordHash) {
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          chips: user.chips // Ensure chips is included
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateChips = async (req, res) => {
  const { userId, chips } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { chips }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Chips updated',
      user: {
        id: user._id,
        username: user.username,
        chips: user.chips
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};