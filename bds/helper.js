const dbs = require("./db");
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
var num_of_test_sets;
var nodemailer = require("nodemailer");
const number_of_questions_in_set = parseInt(process.env.number_of_questions_in_set);

class helper {
    constructor(){

    }
    authenticate(req,res,pass,email){
        pass = parseInt(pass);
        let obj = {id:email,pass:pass};
        return dbs().then((connection_obj,err)=>{
            if(err) console.log(err);
            return connection_obj.getDataAdmin(obj);
        }).then((result)=>{
            if(result.length){
                jwt.sign({ foo: 'bar' }, process.env.JWT_AUTH_KEY, function(err, token) {
                    if(err) console.log(err);
                    try {
                        var cookies = new Cookies(req, res, { maxAge: 60000 });
                        cookies.set('token', token); 
                        res.redirect("/admin/dashboard");
                        //res.send({statusCode:"1",mess:"successfully login",sendBy:"u"});
                    } catch (error) {
                        res.send({statusCode:"0",mess:error.message,sendBy:"e"});
                    }
                });
            }
            else{
                res.send({statusCode:"0",mess:"Entered detail are Wrong.",sendBy:"u"});
            }
        }).catch((error)=>{
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        });
    }
    ////////////////////////////////////////// START /////////////////////////////////////////

    side_bar_requirment(res){
        let a={};
        return dbs().then((connection_obj)=>{
            return connection_obj.get_count(a)
        }).then((result)=>{
            num_of_test_sets = parseInt(result/number_of_questions_in_set);
            return this.read_dir(process.env.path_of_pad_file);
        }).then((data)=>{
            res.render('user/views/dashboard/dashboard',{num_of_test_sets:num_of_test_sets,pdf_length:data});

        }).catch((error)=>{
            console.log(error);
            res.render(`<h1>${error}</h1>`);
        })
    }
    read_dir(dir,fileId="null"){
        return new Promise((resolve,reject)=>{
            
            fs.readdir(dir, (err, files) => {
                if(err) reject(err);
               
                let pdf_length = files.length;
                if(fileId === "null")
                resolve(pdf_length);
                else resolve(files[fileId]);
            });
        })
    }
    getQuestionsSet(res,test_number){ 
        let skip = (test_number-1)*10;
        let obj={};
        return dbs().then((connection_obj)=>{
            return connection_obj.getData(obj,skip,number_of_questions_in_set);
        }).then((result)=>{
            res.render('user/views/test/test_Q&A',{data:result,dataStr:JSON.stringify(result)});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
    getFileName(dir,fileId,res){
        return this.read_dir(dir,fileId).then((file_name)=>{
            res.render('user/views/doc/doc_show',{file_name:file_name});
        }).catch((error)=>{
            res.send(error);
        })
    }
    send_mail(req,res){
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.pass
        }
      });
        var mailOptions = {
          from: process.env.email,
          to: req.query.email,
          subject: req.query.subject,
          text: req.query.Message,
          // html: "<h1>mavi g</h1>"
        };
      
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          transporter.close();
          res.redirect('/');
        });
    }
    //////////////////////////////////////////  END  /////////////////////////////////////////
    
    insertQuestions(res,obj){
        return dbs().then((connection_obj)=>{
            return connection_obj.insertData(obj);
        }).then((result)=>{
            res.send({statusCode:"1",mess:"done",sendBy:"u"});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
    edit_questions(res,obj){
        let query = {_id:ObjectId(obj._id)};
        let remove_id = {"question":obj.question ,"option0":obj.option0 ,"option1":obj.option1 ,"option2":obj.option2 ,"option3":obj.option3 ,"answer":obj.answer}
        let set = { $set: remove_id };
        
        return dbs().then((connection_obj)=>{
            return connection_obj.updateData(query,set);
        }).then((result)=>{
            res.send({statusCode:"1",mess:"done",sendBy:"u"});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
    render_Admin_Add_Quetions_Page_With_set_number(res){
        let obj={};
        return dbs().then((connection_obj)=>{
            return connection_obj.getData(obj);
        }).then((result)=>{
            let str = JSON.stringify(result.length/20);
            let set_number = parseInt(str.split('.'));
            res.render('user/views/admin/admin.ejs',{set_number:set_number+1});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
    getQuestionsSet_show(res){
        let obj={};
        return dbs().then((connection_obj)=>{
            return connection_obj.getData(obj);
        }).then((result)=>{
            // console.log(result);
            // res.render('user/views/admin/questions_table.ejs');
            res.render('user/views/admin/questions_table.ejs',{data:result});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
    deleteQuestion(res,id){
        let obj = {"_id":ObjectId(id)};
        return dbs().then((connection_obj)=>{
            return connection_obj.deleteData(obj);
        }).then((result)=>{
            // console.log(result);
            res.send({statusCode:"1",mess:"done",sendBy:"u"});
        }).catch((error)=>{
            console.log(error);
            res.send({statusCode:"0",mess:error.message,sendBy:"e"});
        })
    }
}
module.exports = helper;