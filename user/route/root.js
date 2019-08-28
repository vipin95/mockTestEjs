const express = require('express');
const app = express.Router();
const helper = require("../../bds/helper");
var nodemailer = require('nodemailer');

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
          pass: process.env.pass
        }
      });
      console.log("2");
      var mailOptions = {
        from: req.query.email,
        to: 'mavi.mymail@gmail.com',
        subject: req.query.subject,
        text: req.query.Message
      };
      console.log("3");
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log("4");
})

module.exports = app;