const Alumno = require('../models/alumno.model.js');
const Grupo = require('../models/grupo.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  console.log("afasfafa"+req.body.NombreAlumno);
  
    const alumno = new Alumno({
      NombreAlumno: req.body.NombreAlumno,
      Apellidos: req.body.Apellidos,
      Edad: req.body.Edad,
      Sexo:req.body.Sexo,
      Grupo:req.body.Grupo,
      Tutor:req.body.Tutor,
      Contacto:req.body.Contacto
    });
  
    Alumno.create(alumno, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Alumno."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreAlumno;
  
    Alumno.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Alumno."
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

    Alumno.updateById(
      req.params.idAlumno,
      new Alumno(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              
              message: `Not found Alumno with id ${req.params.idAlumno}.`
             

            });
          } else {
            res.status(500).send({
              message: "Error updating Alumno with id " + req.params.idAlumno
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Alumno.remove(req.params.idAlumno, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alumno with id ${req.params.idAlumno}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Alumno with id " + req.params.idAlumno
          });
        }
      } else res.send({ message: `Alumno was deleted successfully!` });
    });
  };
  

  exports.only = (req, res) => {
    Alumno.only(req.params.idGrupo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alumno with id ${req.params.idGrupo}.`
          });
        } 
      } else res.send(data);
    });
  };