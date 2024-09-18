const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'lpa/1g4SbR2pN1C9g6Hc5q8IF6w3RAur1Ap1OFmTMlU=';


//registration controller
const registerUser = async (req, res) => {
  const { username, role, password } = req.body;
  if (!username || !role || !password) {
    return res.status(400).send('Username, role, and password are required.');
  }
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      username,
      role,
      password: hashedPassword
    });
    // Save the user to the database
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).send('Server error');
  }
};

// Login user function
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role, message: 'Login successful' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  registerUser,
  loginUser
};