const express = require('express');
const app = express.Router();
const helper = require('../../bds/helper');

app.get('/',(req,res)=>{

    console.log(req.query.id);
    let test_number = req.query.id;
    let helper_obj = new helper();
    helper_obj.getQuestionsSet(res,test_number);
})

module.exports = app;