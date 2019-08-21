const express = require('express');
const app = express();
const engine = require('ejs-locals');

const port = process.env.PORT || 5000;

app.use(express.static('./'));
app.set('views', __dirname + '/user/views');

app.set('view engine', 'ejs');
app.engine('ejs', engine);

const root= require('./user/route/root');
const test = require('./user/route/test');

app.use('/',root);
app.use('/test',test);

app.listen(port,()=>console.log("Server running on Port 127.0.0.1:"+port));