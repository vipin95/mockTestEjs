require('dotenv').config();
const express = require('express');
const app = express();
const engine = require('ejs-locals');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.PORT || 5000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static('./user'));
app.set('views', __dirname);

app.set('view engine', 'ejs');
app.engine('ejs', engine);

const root= require('./user/route/root');    // direct path like " /abcd? "
const test = require('./user/route/test');   // test related all routes
const doc = require('./user/route/doc'); // all notes routes
const admin = require('./admin/route/admin'); // all admin routhe

app.use('/',root);
app.use('/test',test);
app.use('/doc',doc);
app.use('/admin',urlencodedParser,admin);

app.listen(port,()=>console.log("Server running on Port 127.0.0.1:"+port));