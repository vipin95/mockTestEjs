const express = require('express');
const app = express.Router();
const helper = require('../../bds/helper');

app.get('/',(req,res)=>{

   res.send('done');
})

module.exports = app;