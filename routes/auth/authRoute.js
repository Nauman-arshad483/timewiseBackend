const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // adjust the path as per your file structure
require('dotenv').config();

router.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    // Create new user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("scret key is...", process.env.SECRET_KEY);
    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
