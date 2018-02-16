const express = require('express')
const {MongoClient, ObjectId}= require('mongodb');
 var app = express();
 var col=null;


MongoClient.connect('mongodb://localhost:27017/todos',(err,client)=>{
    if(err)
    {
        console.log("Cant Connect to database")
    }
    console.log("Connected to data base")
    const db=client.db('todos')
    col=db.collection('todos');
  
    // col.find({status : 'completed'}).toArray().then((docs)=>
    // {
    //     console.log(JSON.stringify(docs,undefined,2))
    // },
    // (err)=>{
    //     console.log("cant fetch data",err)
    // })
    col.findOneAndUpdate({_id: new ObjectId("5a8673ea0b65c90490fab4ab")},{
        $set:{
            status: 'cancelled'
        }
    },{returnOriginal:false}).then((result)=>console.log(JSON.stringify(result)))
    client.close()
    console.log("disconnected from database")
})
 app.get('/',(req,res)=>{
     res.send()
 });
 app.listen(3000);