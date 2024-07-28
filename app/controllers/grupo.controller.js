const Grupo = require('../models/grupo.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const grupo = new Grupo({
      NombreGrupo: req.body.NombreGrupo,
      Materias:req.body.Materias
    });
  
    Grupo.create(grupo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Grupo."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreGrupo;
  
    Grupo.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Grupo."
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
  
    console.log(req.body.Materias);
  
    Grupo.updateById(
      req.params.idGrupo,
      new Grupo(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Grupo with id ${req.params.idGrupo}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Grupo with id " + req.params.idGrupo
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Grupo.remove(req.params.idGrupo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Grupo with id ${req.params.idGrupo}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Grupo with id " + req.params.idGrupo
          });
        }
      } else res.send({ message: `Grupo was deleted successfully!` });
    });
  };
  