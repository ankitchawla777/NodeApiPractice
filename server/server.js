require('./config/config');
const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId}= require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/users');

const port= process.env.PORT ;

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({ todos })
    },
        (error) => {
            res.status(400).send(err)
        }
    ).catch((e) => {
        console.log("Error:", e)
    })
});

app.get('/todos/:id', (req, res) => {
    var id=req.params.id;
    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(todo){
        res.status(200).send({ todo })}
        else{
           return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
        
    });
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err)
    })
    console.log(req.body);
})

app.patch('/todos/:id', (req, res) => {
    var id=req.params.id;
    var body = _.pick(req.body,['text','desc','completed'])
    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }
    if(_.isBoolean(body.completed)&& body.completed)
    {
        body.completedAt= new Date().getTime();
    }
    else{
        body.completed=false;
        body.completedAt= null;
    }
    Todo.findByIdAndUpdate(id,
        {$set:body},{new:true}).then((todo) => {
        if(todo){
        res.status(200).send({todo})}
        else{
           return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send(e)
    })

});

app.delete('/todos/:id', (req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
        res.status(200).send({ todo })}
        else{
           return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Users Section

app.post('/users',(req,res)=>{
    var body =_.pick(req.body,['email','phn','password']);
    var user = new User(body);
user.save().then(()=>{
    return user.generateAuthToken();
}).then((token)=>{
    res.header('x-auth',token).status(200).send(user);
}).catch(e=>res.status(400).send(e));
})

app.listen(port, () => console.log(`started on port ${port}`));



