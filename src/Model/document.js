const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
      },
      documentImage:{
        type: String,
        required: true
    },
    filename: { type: String, required: true },
    size:{type:Number,required:true},
    type:{type:String,required:true}
 },
 { timestamps: true});

 //hash password token

   
module.exports = mongoose.model('document', documentSchema);
