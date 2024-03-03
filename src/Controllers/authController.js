const User = require('../Model/user');


exports.forgotPassword = async (req, res,next) => {

    
    const user = await User.findOne({email: req.body.email});

    if(!user){
     res.status(400).json({msg:'No account with this email found'})  ;

    }
    const resetToken = user?.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    //create reset url

    const reserUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`

    const message = `You are receiving this email because you(or someone else) has requested to reset password.`

    try {
        await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
        })
        res.status(200).json({ success: true, data:'Email sent' });
        } catch (error) {
        console.log(err);
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse('Email could not be sent', 500))
        }   
}
//Reset Password
exports.resetPassword = async (req,res,next) =>{
    //get token
    const resetPasswordToken= crypto
     .createHash('sha512')
     .update(req.params.resetToken)
     .digest('hex')

     const user = await User.findOne({
        resetPasswordToken,resetPasswwordExpire: {$gt:Date.now()}
     });
     if(!user){
        return next(new ErrorResponse('Invalid token',400));
     }
     //set new password
       user.password = req.body.password;
       user.resetPasswordToken = undefined;
       usser.resetPasswwordExpire = undefined;
       await user.save();

       const id = user.getId();
       sendTokenResponse(user,200,res,id);

     }

     


   