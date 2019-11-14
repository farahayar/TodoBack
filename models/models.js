//models.js
const mongoose = require('mongoose');


// =======
// Schemas
// =======
const Schema = mongoose.Schema;
const jokesSchema = new Schema({
    content: String,
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const models = {};
models.Jokes = mongoose.model('jokes', jokesSchema);

module.exports = models;