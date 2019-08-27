const express = require('express');
const app = express.Router();
const helper = require('../../bds/helper');

app.get('/',(req,res)=>{
   let file_number = req.query.id;
   let helper_obj = new helper();
   helper_obj.getFileName(process.env.path_of_pad_file,file_number,res);
})

module.exports = app;