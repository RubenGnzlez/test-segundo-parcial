const express = require('express');
const Car = require('../models/car');

function index (request, response, next){
  const page = request.params.page ? request.params.page : 1;
  Car.paginate({},{
    page: page,
    limit: 3
  },(err, obj)=>{
    if(err){
      response.json({
        error: true,
        message : 'No se encontraron carros',
        objs: {}
      });
    }else{
      response.json({
        error: false,
        message : 'Carros encontrados:',
        objs: obj
      });
    }
  });
}

function findOne (request, response, next){
  let id = request.params.id;

  if(id){
    Car.find({ _id: id }).exec((err, obj)=>{
        if(err){
          response.json({
            error: true,
            message : 'No se encontraron carros',
            objs: {}
          });
        }else{
          response.json({
            error: false,
            message : 'Carro Buscado:',
            objs: obj
          });
        }
      });
  }else{
    response.json({
      error: true,
      message : 'Carro inexistente',
      objs: {}
    });
  }
}

function create(request, response, next) {
  let model = request.body.model;
  let description = request.body.description;
  let status = request.body.status;
  let color = request.body.color;

  let car = new Car();
  car.model = model;
  car.description = description;
  car.status = status;
  car.color = color;

  car.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Carro no  guardado',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Carro guardado',
        objs: obj
      });
    }
  });
}

/*function update (request, response, next){
  let id = request.params.id;
  let model = request.body.model ? request.body.model : "";
  let description = request.body.description ? request.body.description :"";
  let status = request.body.status ? request.body.status : "";
  let color = request.body.color ? request.body.color : "";

  if(id){
    Car.update({_id:id},{set: {model:model,description : description, status : status, color : color}},

      (err, obj)=>{
          if(err){
            response.json({
              error: true,
              message : 'No se editó el carro',
              objs: {}
            });
          }else{
            response.json({
              error: false,
              message : 'Carro editado:',
              objs: obj
            });
          }
        }

    );
  }
}*/

//weirdCar.update({$inc: {wheels:weirdCar 1}}, { w: 1 }, callback);

function remove (request, response, next){
  let id = request.params.id;

  if(id){
    Car.remove({ _id : id},function(err){
      if(err){
        response.json({
          error: true,
          message : 'Carro no eliminado',
          objs: {}
        });
      }else{
        response.json({
          error: false,
          message : 'Carro eliminado',
          objs: {}
        });
      }
    });
  }else{
    response.json({
      error: true,
      message : 'Carro no existente',
      objs: {}
    });
  }
}


module.exports = {
  create,
  index,
  findOne,
  remove
};
