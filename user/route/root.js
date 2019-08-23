const express = require('express');
const app = express.Router();
const helper = require("../../bds/helper");

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

module.exports = app;