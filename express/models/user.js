const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


const schema = Schema({
  email: String,
  password: String,
  salt: String
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);
