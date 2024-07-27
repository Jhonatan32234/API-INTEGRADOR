const Materia = require('../models/materia.model.js');


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const materia = new Materia({
      NombreMateria: req.body.NombreMateria,
    });
  
    Materia.create(materia, (err, data) => {
      console.log(materia)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Materia."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreMateria;
  
    Materia.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Materia."
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
  
    Materia.updateById(
      req.params.idMateria,
      new Materia(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Materia with id ${req.params.idMateria}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Materia with id " + req.params.idMateria
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Materia.remove(req.params.idMateria, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Materia with id ${req.params.idMateria}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Materia with id " + req.params.idMateria
          });
        }
      } else res.send({ message: `Materia was deleted successfully!` });
    });
  };
  