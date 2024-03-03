const Document = require('../Model/document');

const mimeTypes = require('mime-types') ;


const  getDocument =async (req,res)=>{
    try{
        const userId =  req.params.userId;

        const documents = await  Document.find({user:userId});
        res.json(documents);
        
    }catch(err){
        console.log("Error in getting document", err)   
        return res.status(500).json({"message":"Unable to retrieve documents"});

        
    }
}

const uploadDocument = async(req,res)=> {
    try{
        const {name,file}=req.body;
        
        const size = file.length;

        const type = mimeTypes.lookup(name);

        const document = new Document({
            name : name ,
            file: file,
            type: type,
            size: size,
            user: req.body.userId
        })
        await document.save()
        res.status(201).json({"message":`File has been uploaded successfully`});

    } catch(e){
        res.status(400).json({"message":"Failed to upload document"});
    }

}
const deleteDocument= async (req,res)=>{
    try{
        const document= await Document.findByIdAndDelete(req.params.Id);
        if(!document){
            return res.status(404).json({"message": "No document with the provided ID was found."});
        }
        res.status(201).json({"message":"Document Deleted Successfully"});
    }catch(e){
        res.status(400).json({"message":"Failed to delete document"}); 
    }


}
const  getDocumentsByID=async(req,res)=>{
    try{
        const document= await Document.findById(req.params.Id);
        if(!document){
            return res.status(404).json({"message": "No document with the provided ID was found."});
        }
        res.json(document)
        
    }catch(e){
        res.status(500).json({"message":"Failed to find document"});
    }

}
module.exports={uploadDocument,deleteDocument,getDocumentsByID,getDocument};