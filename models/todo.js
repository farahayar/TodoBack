const mongooose = require('mongoose');
const validator = require('validator');



const todoschema = new mongooose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
            unique :false
          


        },
        description: {
            type: String,
            require: true,
            trim: true,
            minlength: 2

        },

        dateAjout: {
            type:Date,
            default:new Date(),
            require : true,
            trim : true

        },

        dateFin: {
            type:Date,
            default:null,
            require : true,
            trim : true

        },
        etat: {

            type:Boolean,
            default : false
        },
        idUser: {
            type: String,
            trim: true,
            minlength: 4

        }


    }
);

Todo = mongooose.model('Todo', todoschema);
module.exports = { Todo };