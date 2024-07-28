const Logro = require('../models/logro.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
  
    const logro = new Logro({
      NombreLogro: req.body.NombreLogro,
      Bonificacion: req.body.Bonificacion,
      Condicion: req.body.Condicion,
      Corte:req.body.Corte
    });
  
    Logro.create(logro, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Logro."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreLogro;
  
    Logro.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Logro."
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
  
    Logro.updateById(
      req.params.idLogro,
      new Logro(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Logro with id ${req.params.idLogro}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Logro with id " + req.params.idLogro
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Logro.remove(req.params.idLogro, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Logro with id ${req.params.idLogro}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Logro with id " + req.params.idLogro
          });
        }
      } else res.send({ message: `Logro was deleted successfully!` });
    });
  };
  