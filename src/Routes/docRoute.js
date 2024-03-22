import  express from 'express';
const router = express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png' || file.mimetype === 'application/pdf'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


import  { uploadDocument, deleteDocument, getDocumentsByID, getDocument } from '../Controllers/docController.js'; 

// Route to upload a document
router.post('/',upload.single("documentImage"), uploadDocument);

// Route to delete a document by ID
router.delete('/documents/:id', deleteDocument);

// Route to get a document by ID
router.get('/documents/:id', getDocumentsByID);

// Route to get all documents for a user
router.get('/documents/user/:userId', getDocument);

export default router;
