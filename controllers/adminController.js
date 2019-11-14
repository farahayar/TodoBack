const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userId = require('mongoose').Types.idUser;

const { mongooose } = require('./../db/config');
const { User } = require('./../models/user')




var app = express();
app.use(bodyParser.json());



app.post("/connexion", (req, res) => {

    var data = req.body;
    let email = data._email;
    let motDePass = data._motDePass;
    let statut = 'superAdmin'



    User.findOne({ email, statut }).then((user) => {

        if (!user) {
            res.status(400).send({ message: "email incorrect" })
        }

        if (motDePass === user.motDePass) {
            res.status(404).send({ message: "mot de passe incorrect" })

        }
        let token = jwt.sign({ idUser: user._id, statut: user.statut }, "kts").toString();
        res.status(200).send({ token });

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });

});

app.get("/getAllUser", (req, res) => {

    User.find({ statut: 'user' }).then((user) => {
        let nbUser = 0;
        user.forEach(element => {
            nbUser = nbUser + 1;
        });
        res.status(200).send({ nbUser });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

})

app.get("/getAllAdmin", (req, res) => {

    User.find({ statut: 'admin' }).then((user) => {
        let nbAdmin = 0;
        user.forEach(element => {
            nbAdmin = nbAdmin + 1;
        });
        res.status(200).send({ nbAdmin });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

})

app.get("/getAllSuperAdmin", (req, res) => {

    User.find({ statut: 'superAdmin' }).then((user) => {
        let nbSuperAdmin = 0;
        user.forEach(element => {
            nbSuperAdmin = nbSuperAdmin + 1;
        });
        res.status(200).send({ nbSuperAdmin });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

})
app.post("/detailsTodoUser", (req, res) => {

    let data = req.body;
    console.log(data);
    /*
        Todo.count({idUser: data.id}).then((rest) => {
            console.log(rest);
    
        })*/

    Todo.find({ idUser: data.id }).then((result) => {
        console.log(result);
        let todos = [];
        let dones = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].etat)
                dones.push(result[i])
            else
                todos.push(result[i])
        }
        console.log(todos);
        console.log(dones);
        res.status(200).send({ nbTodos: todos.length, nbDones: dones.length });


    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.post("/detailsByMonth", (req, res) => {
    let data = req.body;

    Todo.find({ idUser: data.id }).then((rest) => {
        console.log(rest);
        let tabT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let tabD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < rest.length; i++) {
            let m = rest[i].dateAjout.getMonth();
            if (rest[i].etat)

                tabD[m]++;
            else
                tabT[m]++;
        }
        console.log(tabT);
        console.log(tabD);

        res.status(200).send({ todo: tabT, done: tabD });

    }).catch((err) => {

    })

});



app.put("/userTodos/:id", (req, res) => {
    let id = req.params.id;
    //  let id = data.id;
    Todo.find({ idUser: id, etat: false }).then((todo) => {
        let nbTodo = 0;
        todo.forEach((element) => {
            nbTodo = nbTodo + 1;
        })


        res.status(200).send(nbTodo);
    })

});

app.put("/userDones/:id", (req, res) => {
    let id = req.params.id;
    // let id = data.id;
    Todo.find({ idUser: id, etat: true }).then((done) => {
        let nbDone = 0;
        done.forEach((element) => {
            nbDone = nbDone + 1;
        })


        res.status(200).send(nbDone);
    })

});

module.exports = app;