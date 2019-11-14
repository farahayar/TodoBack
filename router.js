const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

/*local*/

const user = require('./controllers/userController');
const todo = require('./controllers/todoController');
const admin = require('./controllers/adminController');
const crud = require('./controllers/crud');
const models = require('./models/models');





var app = express();
var port = "3000";


app.use(bodyParser.json());
app.use(cors());

//app.use('/api/jokes', require(crud)(models.user));




app.use("/user",user);
app.use("/todo",todo);
app.use("/admin",admin);


app.get("/user",(req,res)=>{
    res.send({
        message : "<h1>welcome to the server</h1>"
    });
});


app.get("/todo",(req,res)=>{
    res.send({
        message : "<h1>welcome to to-do controller</h1>"
    });
});

app.get("/admin",(req,res)=>{
    res.send({
        message : "<h1>welcome to admin controller</h1>"
    });
});


// Server
app.listen(port, () => console.log(`Listening on port ${port}`));






