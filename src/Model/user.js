const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 userName: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 email: {type:String,unique:true,required:true},
 phone:{type:Number,unique:true,required:true},
 country:{type:String,required:true},
 idNo: {type:String,unique:true,required:true},

 });

 //hash password token
 userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha512').update(resetToken).digest('hex');

    //set expire
    this.resetPasswordExpire = Date.now() + 10  * 60 * 1000;
    return resetToken;
};
  
module.exports = mongoose.model('User', userSchema);