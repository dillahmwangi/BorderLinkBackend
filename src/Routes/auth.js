
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')
const jwt = require('jsonwebtoken');
const User = require('../Model/user');



// User registration
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/forgotPassword', authController.forgotPassword);
router.put('/resetPassword', authController.resetPassword);


const verifyToken = (req, res, next) => {
  const token_with_bearer = req.headers['authorization'];
  const token = token_with_bearer.split(' ')[1]

  if (!token) {
      console.log("am token: ", token)
      return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = decoded.user_id; // Attach user ID to request object
      next();
  });
};

// GET user profile
router.get('/profile', verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
      // Fetch user profile from the database based on userId
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Send user profile as a JSON response
      res.status(200).json({
          username: user.username,
          email: user.email,
          phone: user.phone,
          country: user.country,
          idNo: user.idNo,
          createdAt: user.createdAt
          // Add other profile fields as needed
      });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

     
module.exports = router;