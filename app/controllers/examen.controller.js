const Examen = require('../models/examen.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

console.log(req.body)  
  
    const examen = new Examen({
      NombreExamen: req.body.NombreExamen,
      ValorExamen: req.body.ValorExamen,
      CalificacionExamen: req.body.CalificacionExamen,
      Reactivos:req.body.Reactivos,
      Aciertos:req.body.Aciertos
    });
  
    Examen.create(examen, (err, data) => {
      console.log("Controller"+examen)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Examen."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreExamen;
  
    Examen.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Examen."
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
  
    Examen.updateById(
      req.params.idExamen,
      new Examen(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Examen with id ${req.params.idExamen}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Examen with id " + req.params.idExamen
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Examen.remove(req.params.idExamen, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Examen with id ${req.params.idExamen}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Examen with id " + req.params.idExamen
          });
        }
      } else res.send({ message: `Examen was deleted successfully!` });
    });
  };
  