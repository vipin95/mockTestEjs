require('dotenv').config();
const express = require('express');
const app = express();
const engine = require('ejs-locals');
// var bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('./user'));
app.set('views', __dirname + '/user/views');

app.set('view engine', 'ejs');
app.engine('ejs', engine);

const root= require('./user/route/root');    // direct path like " /abcd? "
const test = require('./user/route/test');   // test related all routes
const doc = require('./user/route/doc'); // all notes routes

app.use('/',root);
app.use('/test',test);
app.use('/doc',doc);

app.listen(port,()=>console.log("Server running on Port 127.0.0.1:"+port));
