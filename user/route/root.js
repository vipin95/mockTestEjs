const express = require('express');
const app = express.Router();

app.get('/',(req,res)=>{
    res.render('./root_pages/root_page');
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