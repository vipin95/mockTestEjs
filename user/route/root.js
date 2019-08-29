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

    // let smtpTransport = mailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     auth: {
    //        user: 'sachin.developer47@gmail.com',
    //        pass: 'sachin@@garg'
    //     }
    // });

    var transporter = mailer.createTransport({
        host: 'smtp.pepipost.com',
        port:25,
        auth: {
          user: 'mavimymail',
          pass: "India@123"
        }
      });
      console.log("2");
      var mailOptions = {
        from: 'mavimymail@pepisandbox.com',
        to: 'mavi.mymail@gmail.com',
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