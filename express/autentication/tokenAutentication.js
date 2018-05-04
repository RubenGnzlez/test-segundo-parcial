const express = require('express');
const jwt = require('jsonwebtoken');


function verifyToken(request, response, next) {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (token) {
    jwt.verify(token, '52d0380eb37d6d4666fddbd82daf5ee3', (err, decoded) => {
      if (err) {
        response.json({
          error: true,
          message: 'Llave incorrecta',
          objs: {}
        });
      } else {
        next();
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Llave incorrecta',
      objs: {}
    });
  }
}

module.exports = {
  verifyToken
};
