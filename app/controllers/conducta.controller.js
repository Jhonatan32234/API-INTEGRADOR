const Conducta = require('../models/conducta.model.js');


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  console.log("afasfafa"+req.body.Titulo);
  
    const conducta = new Conducta({
      Fecha: req.body.Fecha,
      Titulo: req.body.Titulo,
      Descripcion: req.body.Descripcion,
      Conducta:req.body.Conducta
    });
  
    Conducta.create(conducta, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Alumno."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const titulo = req.query.Titulo;
  
    Conducta.getAll(titulo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Conducta."
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

    Conducta.updateById(
      req.params.idConducta,
      new Conducta(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Conducta with id ${req.params.idConducta}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Conducta with id " + req.params.idConducta
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Conducta.remove(req.params.idConducta, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Conducta with id ${req.params.idConducta}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Conducta with id " + req.params.idConducta
          });
        }
      } else res.send({ message: `Conducta was deleted successfully!` });
    });
  };
  