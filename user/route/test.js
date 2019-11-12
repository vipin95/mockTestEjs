const express = require('express');
const app = express.Router();
const helper = require('../../bds/helper');

app.get('/',(req,res)=>{

    let test_number = req.query.id;
    let helper_obj = new helper();
    helper_obj.getQuestionsSet(res,test_number);
})
app.get('/result',(req,res)=>{
    let correct_ans_str = req.query.Curr_ans;
    let correct_ans = parseInt(correct_ans_str);
    let incorrect_ans = parseInt(process.env.number_of_questions_in_set)-correct_ans;
    res.render('user/views/test/result.ejs',{data : { correct : correct_ans, incorrect : incorrect_ans, totelQues : parseInt(process.env.number_of_questions_in_set)}});
})
app.get('/symbol',(req,res)=>{
    res.render('user/views/doc/symbols');
})
module.exports = app;