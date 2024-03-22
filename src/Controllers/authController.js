import User from'../Model/user.js'; 
import bcrypt from'bcryptjs'; 
import otpGenerator from'otp-generator'; 
import nodemailer from'nodemailer'; 
import jwt from'jsonwebtoken';


const register = async (req, res) => {
  try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) return res.status(400).json({ message: "Email Already Exist" });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
          ...req.body,
          password: hashPassword,
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}

const login = async (req, res) => {
  try {
      // checking if email exists
      
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ message: "Incorrect Email or Password" });

      // verifying password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Incorrect Email or Password" });

      // create token
      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "5h"
      });
      res.header('Authorization', `Bearer ${token}`).json({ token: token, user:user });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}


const forgotPassword = async(req, res) => {
  const {email} = req.body
  const user = await User.findOne({email})
  if (!user) return res.status(400).json({message: "User not found"})


  //generete OTP
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits:true });

  user.resetPasswordToken = otp
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

  //send OTP to user's email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "",
      pass: ""
    }
  })

  const mailOptions = {
    from: '',
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.status(500).json({message: "Error sending OTP"})
    } else {
      res.status(200).json({message: "OTP sent successfully"})
    }
  })
}


const resetPassword = async(req, res) =>{
  const {otp, newPassword } = req.body;
  const user = await User.findOne({ resetPasswordToken: otp, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });


   // Validate OTP (you may need to store OTP in the database)
  if (user) {
    // Update password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } else {
      res.status(400).json({ message: "Invalid OTP" });
  }

}



const logout = (req, res) => {
  try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

      // Token manipulation should be handled differently.
      res.clearCookie("token").send({ message: "Successfully logged out" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};





export {register, forgotPassword, login, resetPassword, logout};













     


   