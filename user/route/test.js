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
    let incorrect_ans = 20-correct_ans;
    
    res.render('./test/result.ejs',{data : { correct : correct_ans, incorrect : incorrect_ans}});
})

module.exports = app;