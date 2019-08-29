var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_AUTH_KEY, function(err, decoded) {
        if(err){
            res.redirect('/admin');
        }
        else{
            next();
        }
    });
}