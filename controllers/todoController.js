const express = require('express');
const bodyParser = require('body-parser');



const { mongooose } = require('./../db/config');
const { Todo } = require('./../models/todo');
const jwt = require('jsonwebtoken');



var app = express();
app.use(bodyParser.json());




app.get("/userTodos", (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;
    let idu = jwt.verify(token, 'kts');
    let id = idu.idUser;
    Todo.find({
        idUser: id,
        etat: false
    }).then((todo) => {
        if (todo.length == 0) { res.status(400).send({ message: "aucun todo pour cet utilisateur" }) };

        res.status(200).send(todo);
    })

});



app.get("/userDones", (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;
    let idu = jwt.verify(token, 'kts');
    let id = idu.idUser;

    Todo.find({
        idUser: id,
        etat: true
    }).then((todo) => {
        if (todo.length == 0) {
            res.status(400).send(console.log("no DONES found" + err));
        }

        else {

            res.status(200).send(todo);


        }
    })

});

app.get('/todoModifAffiche/:id', (req, res) => {

    let id = req.params.id; 
    Todo.findOne({ _id :id }).then((todoArray) => {

        res.status(200).send(todoArray);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })

});


});

app.put("/todoModif/:id", (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;
    let i = jwt.verify(token, 'kts');
    let idu = i.idUser;
    let idTodo = i.id;
    var todo = {
        title: data.title,
        description: data.description,

    };

    Todo.findByIdAndUpdate({
        idUser: idu,
        _id: req.params.id
    }, { $set: todo }, { new: true }, (err, doc) => {
        if (!err) { res.status(200).send(doc); }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    })

});


app.post("/todoAjout", (req, res) => {
    let data = req.body;
    let token = req.headers.authorization;
    let idu = jwt.verify(token, 'kts');

    let todo = new Todo({
        title: data.title,
        description: data.description,
        idUser: idu.idUser
    })


    todo.save().then(() => {


        res.status(200).send(todo);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });
});


app.delete('/deleteTodo/:id', (req, res) => {

    let token = req.headers.authorization;
    let idu = jwt.verify(token, 'kts');
    let id = idu.id;

    Todo.findOneAndRemove(
        {
            _id: req.params.id,
            idUser: idu.idUser
        },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Employee Delete :' + err) }
        });
});

app.put('/isDone/:id', (req, res) => {

    let token = req.headers.authorization;
    // console.log(token);

    let i = jwt.verify(token, 'kts');
    let idu = i.idUser;
    var todo = {
        etat: true,
        dateFin: new Date()
    };

    console.log(todo);


    Todo.findByIdAndUpdate({
        idUser: idu,
        _id: req.params.id
    }, { $set: todo }, { new: true }, (err, doc) => {

        if (!err) { res.status(200).send(doc); }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    });


});

module.exports = app;
