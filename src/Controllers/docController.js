import Document from '../Model/document.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});



const uploadDocument = async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        console.log("req.file.path: ", req.file.path)
      const { name } = req.body;
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("result: ", result)
  
      // Save Cloudinary URL to database
      const file = new Document({
        filename: name,
        documentImage: result.secure_url, 
        type: result.format, 
        size: result.bytes, 
        user: req.userId
      });
  
      await file.save();
      res.status(201).json({ "message": `File has been uploaded successfully` });

    } catch (e) {
      res.status(400).json({ "message": "Failed to upload document", error: e });
    }
};
  

const getDocuments = async (req, res) => {
    try {
        console.log("req.userId", req.userId)
        const documents = await Document.find({ user: req.userId });
        res.json(documents);
    } catch (err) {
        console.error("Error in getting document", err);
        return res.status(500).json({ "message": "Unable to retrieve documents" });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.Id);
        if (!document) {
            return res.status(404).json({ "message": "No document with the provided ID was found." });
        }
        res.status(201).json({ "message": "Document Deleted Successfully" });
    } catch (e) {
        res.status(400).json({ "message": "Failed to delete document" });
    }
};

const getDocumentsByID = async (req, res) => {
    try {
        const document = await Document.findById(req.params.Id);
        if (!document) {
            return res.status(404).json({ "message": "No document with the provided ID was found." });
        }
        res.json(document);
    } catch (e) {
        res.status(500).json({ "message": "Failed to find document" });
    }
};

export { uploadDocument, deleteDocument, getDocumentsByID, getDocuments };
