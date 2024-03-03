const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const  docController  = require('../Controllers/docController'); 

// Route to upload a document
router.post('/upload',upload.single("document"), docController.uploadDocument);

// Route to delete a document by ID
router.delete('/documents/:id', docController.deleteDocument);

// Route to get a document by ID
router.get('/documents/:id', docController.getDocumentsByID);

// Route to get all documents for a user
router.get('/documents/user/:userId', docController.getDocument);

module.exports = router;
