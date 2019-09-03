const express = require('express');
const app = express.Router();
const helper = require("../../bds/helper");

app.get('/',(req,res)=>{
    let helper_obj = new helper()
    helper_obj.side_bar_requirment(res);
})
app.get('/about',(req,res)=>{
    res.render('user/views/about_us/about');
})
app.get('/contact',(req,res)=>{
    res.render('user/views/contact_us/contact',{data:0});
})
app.get('/dl_process',(req,res)=>{
    res.render('user/views/dl_process/process');
})
app.get('/penalty',(req,res)=>{
    res.render('user/views/penalty/penalty');
})
app.get('/send_mail',(req,res)=>{
    let helper_obj = new helper()
    helper_obj.send_mail(req,res);
})

module.exports = app;
