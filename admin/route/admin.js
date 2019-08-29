const express = require("express");
const app = express.Router();
const helper = require('../../bds/helper');
const auth = require('../../customModule/adminAuth');

app.get('/',(req,res)=>{
    res.render('admin/views/login_form/login_form');
})
app.post('/login',(req,res)=>{
    
    let email = req.body.email;
    let pass = req.body.password;
    let helper_obj = new helper();
    helper_obj.authenticate(req,res,pass,email);
})
app.get('/dashboard',auth,(req,res)=>{
    res.render('admin/views/dashboard/dashboard.ejs');
})

module.exports = app;