const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record
    const newUser = await User.create({ username, password: hashedPassword });
    // Redirect or send a response indicating successful sign-up
    res.status(201).json({ message: 'Sign-up successful', user: newUser });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Set user session
    req.session.user = user;
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Error signing in' });
  }
};

exports.logout = (req, res) => {
  // Destroy user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};
