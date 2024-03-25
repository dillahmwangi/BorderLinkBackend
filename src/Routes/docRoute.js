import express from 'express';
const router = express.Router();
import multer from 'multer';
import cloudinary from 'cloudinary';
import { uploadDocument, deleteDocument, getDocumentsByID, getDocuments } from '../Controllers/docController.js';
import { verifyToken } from './auth.js';

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
router.get('/documents/user', verifyToken,  getDocuments);

export default router;
