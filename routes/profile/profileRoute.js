const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // adjust the path as per your file structure
require('dotenv').config();

router.post('/api/createProfile', async (req, res) => {
    console.log("hey")
  const { name, email, major, userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, email, major }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
