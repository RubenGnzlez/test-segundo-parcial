const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');



function create(request, response, next) {
  let email = request.body.email;
  let password = request.body.password;

  let user = new User();
  user.email = email;

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

      user.password = hash;
      user.salt = salt;

      user.save((err, obj) => {
        if (err) {
          response.json({
            error: true,
            message: 'Usuario no  Guardado',
            objs: {}
          });
        } else {
          response.json({
            error: false,
            message: 'usuario Guardado',
            objs: obj
          });
        }
      });
    });
  });



}




module.exports = {
  create
};
