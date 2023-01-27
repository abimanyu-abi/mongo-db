const { ObjectId } = require('bson');
const express =require('express');
const {connectToDb,getDb, getDB} =require('./db');

const app =express();

app.use(express.json());

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

app.get('/books/:id',(req,res)=>{
     const idParam= req.params.id

     if(ObjectId.isValid(idParam)){
      db.collection('books')
     .findOne({_id:ObjectId(idParam)})
     .then(document=>{
      res.status(200).json(document)
     })
     .catch(err=>{
      res.status(500).json({error:"could not fetch data"})
     })

     }else{
      res.status(500).json({err:"Its not a valid id"})
     }

     
})

app.post('/books',(req,res)=>{

   const body = req.body;
   db.collection('books')
   .insertOne(body)
   .then(result=>{
    res.status(201).json(result);
    
   })
   .catch(err=>{
    res.status(500).json({msg:'could not post  the data'})
   })

})

app.delete('/books/:id',(req,res)=>{
       if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id:ObjectId(req.params.id)})
        .then(result=>{
          res.status(201).json(result)
        })
        .catch(err=>{
          res.status(500).json({err:'Could not delete the item'})
        })
       }
       else{
        res.status(500).json({err:'its not the valid Id'})
       }
})