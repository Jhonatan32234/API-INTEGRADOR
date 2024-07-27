const Actividad = require('../models/actividad.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    //console.log("Recibir"+req.body.NombreActividad);
    const actividad = new Actividad({
      NombreActividad: req.body.NombreActividad,
      ValorActividad: req.body.ValorActividad,
      Grupo:req.body.Grupo,
      Materia:req.body.Materia,
      Corte:req.body.Corte
    });
    console.log("Preparar "+req.body.NombreActividad)
    Actividad.create(actividad, (err, data) => {
      //console.log('enviar'+actividad.NombreActividad)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Actividad."
        });
      
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreActividad;
  
    Actividad.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Actividad."
        });
      else res.send(data);
    });
  };

  exports.only = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const grupo = req.params.idGrupo;
    const materia = req.params.idMateria;
    const corte = req.body.Corte;

    Actividad.only(grupo,materia,corte, (err, data) => {
      //console.log('enviar'+actividad.NombreActividad)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while Searching the Actividad."
        });
      
      else res.send(data);
    });

  }

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("AQui");
    console.log(req.body);
    let grupo = req.params.Grupo;
    let materia = req.params.Materia;
    console.log(grupo+materia)
  
    Actividad.updateById(
      req.params.idActividad,grupo,materia,
      new Actividad(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Actividad with id ${req.params.idActividad}.`+req.body.NombreActividad
            });
          } else {
            res.status(500).send({
              message: "Error updating Actividad with id " + req.params.idActividad
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Actividad.remove(req.params.idActividad, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Actividad with id ${req.params.idActividad}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Actividad with id " + req.params.idActividad
          });
        }
      } else res.send({ message: `Actividad was deleted successfully!` });
    });
  };
  

