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
    var smtpTransport = mailer.createTransport("SMTP",{
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "sachin.developer47@gmail.com",
            pass: 'sachin@@garg'
        }
    });
      console.log("2");
      var mail = {
        from: req.query.email,
        to: "mavi.mymail@gmail.com",
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: "<b>Node.js New world for me</b>"
    }
    
      console.log("3");
      smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        smtpTransport.close();
        res.send("done");
    });
})

module.exports = app;