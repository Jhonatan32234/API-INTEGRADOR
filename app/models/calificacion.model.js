const sql = require('./db.js');

const Calificacion = function(calificacion){
    this.idCalificacion = calificacion.idCalificacion;
    this.seleccion = calificacion.Seleccion;
    this.dato = calificacion.Dato
}


Calificacion.create = (newCalificacion,result) =>{
    sql.query('INSERT INTO calificacion set idCalificacion = ?',
        [newCalificacion.idCalificacion],
        (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if (res.affectedRows == 0) {
              result({ kind: "not_found" }, null);
              return;
            }
      
            console.log("Created Calificacion: ", {newCalificacion });
            result(null, { newCalificacion });
          }
    )
}
Calificacion.getAll = (nombre, result) => {
    let query = `select alumnos.idAlumno, alumnos.NombreAlumno ,alumnos.Apellidos,
     calificacion.Corte1 ,calificacion.Corte2,calificacion.Corte3 ,calificacion.Calificacion,
     calificacion.Reprobado from alumnos inner join calificacion on
      alumnos.idAlumno = calificacion.idCalificacion`;
  
    if (nombre) {
      query += ` WHERE Nombre LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Calificacion: ", res);
      result(null, res);
    });
  };


Calificacion.updateById = (id, calificacion, result) => {
    sql.query(
     ` UPDATE calificacion SET ${calificacion.seleccion}=? WHERE idCalificacion = ?`,
      [calificacion.dato, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated calificacion: ", { id: id, ...calificacion });
        result(null, { id: id, ...calificacion });
      }
    );
  };

  Calificacion.remove = (id, result) => {
    sql.query("DELETE FROM calificacion WHERE idCalificacion = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Calificacion with idCalificacion: ", id);
      result(null, res);
    });
  };




  module.exports = Calificacion;