
import  express from 'express';
const router = express.Router();
import {register, forgotPassword, login, resetPassword, logout} from'../Controllers/authController.js'
import jwt from'jsonwebtoken';
import User from '../Model/user.js';



// User registration
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);


export const verifyToken = (req, res, next) => {
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
      console.log(req.userId)
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

     
export default router;