const nodemailer = require ("nodemailer");



const sendEmail = async(email, subject, text) => {
    //reusable transporter object using default SMTP transport
try{
    const transporter = nodemailer.createTransport({
        host:process.env.HOST,
        service:process.env.SERVICE,
        port:587,
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        },
        
    });

    //send mail with defined transport   object
     await transporter.sendMail({
        from:process.env.USER,
        to:email,
        subject:subject,
        text:text,
     });
      console.log("Email has been sent!");
}catch (err){
    console.error(`Error sending email ${err}`);
}; 
}
      module.exports =sendEmail;
