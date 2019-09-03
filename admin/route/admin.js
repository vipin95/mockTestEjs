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
app.post('/add_question',auth,(req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        
        var hrTime = process.hrtime()
        let status =1;
        for(let i=1 ; i<6 ; i++ ){
            let img = "img"+i;
            if(files[img].name){
                status =0;
                let name = parseInt((hrTime[0] * 1000000 + hrTime[1] / 1000)+(Math.random())*1000);
                if(img === "img1"){
                    fields["ques_image"] = true;
                    fields["ans_image"] = false;
                    fields["ques_image_name"] = name;
                }
                else if(img != "img1"){
                    fields["ques_image"] = false;
                    fields["ans_image"] = true;
                    fields["ans_image_name_"+i] = name;
                }
                
                fs.rename(files[img].path, './user/public/assets/question_ans_img/'+name, function (err) {
                    if (err) throw err;
                    console.log("file uploaded");
                });    
            }
            if(status && i==5){
                fields["ques_image"] = false;
                fields["ans_image"] = false;
            }
        }
        res.send(fields);
        // let helper_obj = new helper();
        // helper_obj.insertQuestions(res,fields);
    });
})

module.exports = app;