const dbs = require("./db");
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');
var ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
var num_of_test_sets;
const number_of_questions_in_set = process.env.number_of_questions_in_set;

class helper {
    constructor(){

    }

    ////////////////////////////////////////// START /////////////////////////////////////////

    side_bar_requirment(res){
        let a={};
        return dbs().then((connection_obj)=>{
            return connection_obj.get_count(a)
        }).then((result)=>{
            console.log(result+"helper1");
            num_of_test_sets = parseInt(result/number_of_questions_in_set);
            console.log(num_of_test_sets+"helper1");
            return this.read_dir();
        }).then((data)=>{
            console.log('all data '+num_of_test_sets,data);
            res.render('./dashboard/dashboard',{num_of_test_sets:num_of_test_sets,pdf_length:data});

        }).catch((error)=>{
            console.log(error);
            res.render(`<h1>${error}</h1>`);
        })
    }
    read_dir(){
        return new Promise((resolve,reject)=>{
            let dir = process.env.path_of_pad_file;
            fs.readdir(dir, (err, files) => {
                if(err) reject(err);
                let pdf_length = files.length;
                resolve(pdf_length);
            });
        })
    }
    //////////////////////////////////////////  END  /////////////////////////////////////////
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
                        // res.redirect("/admin/login");
                        res.send({statusCode:"1",mess:"successfully login",sendBy:"u"});
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
    getQuestionsSet(res,obj){    
        return dbs().then((connection_obj)=>{
            return connection_obj.getData(obj);
        }).then((result)=>{
            res.render('./onlineTest/test.ejs',{data:result,dataStr:JSON.stringify(result)});
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
            res.render('admin/admin.ejs',{set_number:set_number+1});
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
            // res.render('./admin/questions_table.ejs');
            res.render('./admin/questions_table.ejs',{data:result});
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