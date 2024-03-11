const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


const  docController  = require('../Controllers/docController'); 

// Route to upload a document
router.post('/',upload.single("documentImage"), docController.uploadDocument);

// Route to delete a document by ID
router.delete('/documents/:id', docController.deleteDocument);

// Route to get a document by ID
router.get('/documents/:id', docController.getDocumentsByID);

// Route to get all documents for a user
router.get('/documents/user/:userId', docController.getDocument);

module.exports = router;
