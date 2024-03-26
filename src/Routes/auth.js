
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


// export const verifyToken = (req, res, next) => {
//     const token_with_bearer = req.headers['authorization'];
    
//     // Check if the authorization header exists
//     if (!token_with_bearer) {
//       // If there's no token provided, continue to the next middleware
//       return next();
//     }
  
//     // Split the authorization header to get the token parts
//     const token_parts = token_with_bearer.split(' ');
  
//     // Check if the token is in the correct format
//     if (token_parts.length !== 2 || token_parts[0] !== 'Bearer') {
//       return res.status(401).json({ message: 'Invalid authorization header' });
//     }
  
//     const token = token_parts[1];
  
//     // Verify the token
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       req.userId = decoded.user_id; // Attach user ID to request object
//       next();
//     });
//   };

export const verifyToken = (req, res, next) => {
    const token_with_bearer = req.headers['authorization'];
  
    if (!token_with_bearer) {
      // If there's no token provided, continue to the next middleware
      return next();
    }
  
    const token_parts = token_with_bearer.split(' ');
  
    if (token_parts.length !== 2 || token_parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authorization header' });
    }
  
    const token = token_parts[1];
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // Attach user ID to request object
      req.userId = decoded.user_id;
      console.log(req.userId); // Make sure user ID is logged
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