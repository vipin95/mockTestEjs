const express = require('express');
const app = express.Router();
const helper = require("../../bds/helper");
var mailer = require("nodemailer");

app.get('/',(req,res)=>{
    let helper_obj = new helper()
    helper_obj.side_bar_requirment(res);
})
app.get('/about',(req,res)=>{
    res.render('./about_us/about');
})
app.get('/contact',(req,res)=>{
    res.render('./contact_us/contact');
})
app.get('/dl_process',(req,res)=>{
    res.render('./dl_process/process');
})
app.get('/penalty',(req,res)=>{
    res.render('./penalty/penalty');
})
app.get('/abc',(req,res)=>{
    console.log(req.query.email);
    console.log("1");

    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mavi.mymail@gmail.com',
    pass: 'Vinaykumar48335*'
  }
});
      console.log("2");
      var mailOptions = {
        from: 'mavi.mymail@gmail.com',
        to: 'sachin.developer47@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: "<b>Node.js New world for me</b>"
      };
    
      console.log("3");
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        transporter.close();
      });
})

module.exports = app;
