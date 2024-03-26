import express from 'express';
const router = express.Router();
import multer from 'multer';
import cloudinary from 'cloudinary';
import { uploadDocument, deleteDocument } from '../Controllers/docController.js';
import { verifyToken } from './auth.js';
import Document from '../Model/document.js';


console.log("name: ", process.env.CLOUD_NAME)
// Cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png' || file.mimetype === 'application/pdf'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Route to upload a document
router.post('/', verifyToken, upload.single("documentImage"), uploadDocument);

// Route to delete a document by ID
router.delete('/documents/:id', deleteDocument);

// // Route to get a document by ID

// Route to get all documents for a user
router.get('/', verifyToken, async (req, res) => {
  let { userId } = req.query;
  console.log("req.userId124: ", req.userId)

  if (!userId) {
    // If user ID is not provided in query params (i.e., accessed via QR code scan)
    // Use the authenticated user's ID from the token
    console.log("req.userId: ", req.userId)
    userId = req.userId;

    // If the user ID is still null, return an empty array of documents
    if (!userId) {
      return res.json([]); // or return res.status(404).json({ message: 'User ID not found' });
    }
  }

  try {
    // Fetch documents associated with the user ID
    const documents = await Document.find({ user: userId });
    res.json(documents);
  } catch (err) {
    console.error('Error in getting documents', err);
    res.status(500).json({ message: 'Unable to retrieve documents' });
  }
});


export default router;
