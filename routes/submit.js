const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const moment = require('moment');
router.post('/submit',(req,res)=>{

    if (!(req.body.email)) {
        res.send("error")
    }

    const formatted = moment.unix(req.body.slot/1000).format("HH:mm ");
    console.log(formatted)
    const output=`
    <h3>NotchUp Trial Class Booked successfully</h3>
    <p>Dear ${req.body.parentsName},</p>
    <p>${req.body.childsName}'s class on ${req.body.date} at ${formatted} has been successfully booked. </p>
    `;
 

   let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'contactnotchuptest.123@gmail.com',
      pass: 'Password@123',
    },
  });

  let mailOptions = {
    from: '"NotchUp 🎓🎓" <contactnotchuptest.123@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "NotchUp: Booking Update", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  }
  transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
          return console.log(err);
      }
      console.log("Message sent: %s", info.messageId);
  

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.render('success',{pageTitle:"NotchUp",msg:'Email has been sent'});

  

      
  });


 

});

module.exports=router;