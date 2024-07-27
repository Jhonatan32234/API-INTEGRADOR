const calActividad = require('../models/calActividad.model.js');


exports.calificate = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    //console.log("Recibir"+req.body.NombreActividad);
    const calAct = new calActividad({
      Data:req.body.Data
    });
    //console.log("Preparar "+req.body.idAlumno)
    calActividad.calificate(calAct, (err, data) => {
      //console.log('enviar'+actividad.NombreActividad)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Actividad."
        });
      
      else res.send(data);
    });
  };


  exports.only = (req,res ) => {
    const idGMA = req.params.idGMA;
    calActividad.only(idGMA, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Actividad."
        });
      else res.send(data);
    });

  }

  exports.findAll = (req, res) => {
    const nombre = req.query.NombreActividad;
  
    calActividad.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Actividad."
        });
      else res.send(data);
    });
  };
  
  exports.delete = (req, res) => {
    calActividad.remove(req.params.idGMAA, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found calActividad with id ${req.params.idGMAA}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete calActividad with id " + req.params.idGMAA
          });
        }
      } else res.send({ message: `calActividad was deleted successfully!` });
    });
  };
  

