const Asistencia = require('../models/asistencia.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
  
    const asistencia = new Asistencia({
      Fecha: req.body.Fecha,
      Asistio: req.body.Asistio,
    });
    Asistencia.create(asistencia, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Alumno."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    //const fecha = req.query.Fecha;
    const idMateria = req.params.idMateria;
    const idGrupo = req.params.idGrupo;
  console.log("materia"+idMateria+"grupo"+idGrupo)
    Asistencia.getAll(idMateria,idGrupo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Asistencia."
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
  
    Asistencia.updateById(
      req.params.idAsistencia,
      new Asistencia(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Asistencia with id ${req.params.idAsistencia}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Asistencia with id " + req.params.idAsistencia
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Asistencia.remove(req.params.idAsistencia, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alumno with id ${req.params.idAsistencia}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Asistencia with id " + req.params.idAsistencia
          });
        }
      } else res.send({ message: `Asistencia was deleted successfully!` });
    });
  };
  