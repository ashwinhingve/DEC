const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // Create new user
    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;