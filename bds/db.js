const mongoClient = require('mongodb').MongoClient;
const Database_Conn_URl = process.env.Database_Conn_URl;
const Database_Name = process.env.Database_Name;
const Test_Paper_DB_Collections = process.env.Test_Paper_DB_Collections;
const Admin_Login_DB_Collections = process.env.Admin_Login_DB_Collections;
var connection;

function createConnection() {
    return new Promise((resolve,reject)=>{
        if (connection === undefined ) {
            mongoClient.connect(Database_Conn_URl, { useNewUrlParser: true,useUnifiedTopology: true }, (err, db) => {
                if (err) console.log(err);
                connection = db.db(Database_Name);
                console.log("Connections done");
                resolve(new Database(connection));
            });
        }else{
            resolve(new Database(connection));
        }
    });
}

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    getDataAdmin(obj) {
        return new Promise((resolve,reject)=>{
            this.connection.collection(Admin_Login_DB_Collections).find(obj).toArray(function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
    insertData(obj){
        return new Promise((resolve,reject)=>{
            this.connection.collection(Test_Paper_DB_Collections).insertOne(obj,(error,result)=>{
                if(error) reject(error);
                resolve(result);
            })
        })
    }
    updateData(query,obj){
        return new Promise((resolve,reject)=>{
            this.connection.collection(Test_Paper_DB_Collections).updateOne(query,obj,{ upsert: true },(error,result)=>{
                if(error) reject(error);
                resolve(result);
            })
        })
    }
    getData(obj){
        return new Promise((resolve,reject)=>{
            this.connection.collection(Test_Paper_DB_Collections).find(obj).toArray(function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
    get_count(obj){
        return new Promise((resolve,reject)=>{
            this.connection.collection(Test_Paper_DB_Collections).find(obj).count(function (err, result) {
                if (err) reject(err);
                console.log(result+"db");
                resolve(result);
            })
        })
    }
    deleteData(obj){
        return new Promise((resolve,reject)=>{
            this.connection.collection(Test_Paper_DB_Collections).deleteMany(obj,(err, result)=> {
                if (err) reject(err);
                resolve(true);
            })
        })
    }
}
module.exports = createConnection;