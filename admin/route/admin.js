const express = require("express");
const app = express.Router();
const helper = require('../../bds/helper');
const auth = require('../../customModule/adminAuth');
var formidable = require('formidable');
var fs = require('fs');

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
app.get('/add',auth,(req,res)=>{
    res.render('admin/views/question/add_question.ejs');
})
app.get('/questionsTable',auth,(req,res)=>{
    let helper_obj = new helper();
    helper_obj.getQuestionsSet_show(res);
})
app.get('/question/Edit',auth,(req,res)=>{
    let id = req.query.id;

   let helper_obj = new helper();
    helper_obj.getDataForEditQues(res,id);
})
app.post('/edit_question/req',auth,(req,res)=>{
    res.send("done");
})

module.exports = app;