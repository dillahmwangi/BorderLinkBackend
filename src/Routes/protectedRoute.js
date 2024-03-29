// protectedRoute.js
import express from 'express';
const router = express.Router();
import verifyToken from '../Middlewares/authMiddleware.js';

// Protected route
router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});

export default router;
