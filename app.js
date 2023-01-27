const express =require('express');
const {connectToDb,getDb, getDB} =require('./db');

const app =express();

//connect db
let db;
connectToDb((err)=>{
        if(!err){
            
                app.listen(3000,()=>{
                    console.log('app is running on port 3000');
                });
                
            db = getDB();
            
        }

})



app.get('/books',(req,res)=>{

    let books=[];
      db.collection('books')
      .find()
      .sort({author:1})
      .forEach(book=>{
           books.push(book);
      })
      .then(()=>{
        res.status(200).json(books);
      })
      .catch(()=>{
            res.status(500).json({error:'could not connect to db'})
      })
    })