const Calificacion = require('../models/calificacion.model.js');

exports.finish = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const calificacion = new Calificacion({
        Data:req.body.Data
    });
  
    Calificacion.finish(calificacion, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Calificacion."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.Nombre;
  
    Calificacion.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Calificacion."
        });
      else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
  
    Calificacion.updateById(
      req.params.idCalificacion,
      req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Calificacion with id ${req.params.idCalificacion}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Calificacion with id " + req.params.idCalificacion
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Calificacion.remove(req.params.idCalificacion, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Calificacion with id ${req.params.idCalificacion}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Calificacion with id " + req.params.idCalificacion
          });
        }
      } else res.send({ message: `Calificacion was deleted successfully!` });
    });
  };
  