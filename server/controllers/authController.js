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

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');

    // Create a new user
    const newUser = new UserModel({
      username,
      passwordHash,
      chips: 1009, // Initial chips
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        highestWin: 0,
        totalChipsWon: 0
      }
    });

    // Save the user to the database
    await newUser.save();

    // Call the login function to log the user in after registration
    req.body.username = username;
    req.body.password = password;
    exports.login(req, res);

  } catch (error) {
    console.error('Registration error:', error);
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