const {MongoClient} =require('mongodb');
const mongoose =require('mongoose');

 let dbConnection
 module.exports={
        connectToDb:(cb)=>{
         MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
         .then((cli)=>{
             dbConnection =cli.db();
             
             console.log("db connected")
             return cb();
         })
         .catch(err=>{
             return cb(err);
         })
        },
        getDB:()=>dbConnection
 }

// MongoClient.connect('mongodb://127.0.0.1:27017/',(error,client)=>{
//     if(!error){
//         console.log("Db connected");
//     }
//     else{
//         console.log(error);
//     }
// })
