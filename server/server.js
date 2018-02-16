var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId}= require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./model/todo');
var { User } = require('./model/users');

const port= process.env.PORT || 3000;

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
    Todo.findById(req.params.id).then((todo) => {
        if(todo){
        res.status(200).send({ todo })}
        else{
            res.status(404).send();
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

app.put('/todos', (req, res) => {

});

app.delete('/todos', )

app.listen(port, () => console.log(`started on port ${port}`));



