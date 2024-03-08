const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user:{type:String, required:true},  //the username of the person who sent this message
    content:{type:String,required: true},   //The actual content of the message
    timestamp: { type : Date , default : Date.now},//timestamp for when the message was created
});

module.exports=mongoose.model('Message',messageSchema);
