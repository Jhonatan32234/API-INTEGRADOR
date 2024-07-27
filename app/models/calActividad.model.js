const sql = require('./db.js');

const calActividad = function(calActividad){
    this.data = JSON.stringify(calActividad.Data);
    
}


calActividad.calificate = (newCal, result) => {
  // Suponiendo que newCal.idAlumno es un JSON válido
const data = JSON.parse(newCal.data);

// Usar map para crear un array de strings concatenados
const calificacion = data.map(item => {
    return `when ${item.idGMAA} then ${item.Calificacion}`;
});
const idGMAA = data.map(es => {
  return es.idGMAA
})
console.log(idGMAA)
// Unir los elemenos del array en un solo string separado por espacios nuevos
const resultado = calificacion.join('\n');

console.log(resultado);

      sql.query(`UPDATE gmaalumno set Calificacion = case idGMAA ${resultado} end Where idGMAA in(${idGMAA})`,
      [data.Calificacion,data.idGMAA] , (err8, res8) => {
      if (err8) {
          console.log("error8: ", err8);
          result(err8, null);
          return;
      }
      console.log("Updated Calificacion:", { data });
      result(null, { data });
    });     
}


calActividad.only = (idGMA, result) => {
  sql.query(`SELECT ga.idGMAA, a.NombreAlumno, ga.Calificacion
FROM gmaalumno ga
INNER JOIN alumnos a ON ga.idAlumno = a.idAlumno
WHERE ga.idGMActividad = ${idGMA};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Actividad: ", res);
    result(null, res);
  });
};

calActividad.getAll = (nombre, result) => {
  let query = 
`SELECT 
    idAlumno,
    SUM(Calificacion) AS total,
    COUNT(*) AS cantidad
FROM 
    gmaalumno
WHERE 
    Calificacion IS NOT NULL
GROUP BY 
    idAlumno;`;

  if (nombre) {
    query += ` WHERE NombreAlumno LIKE '%${nombre}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Resultado: ", res);
    result(null, res);
  });
};



calActividad.remove = (id, result) => {
  sql.query("DELETE FROM gmaalumno WHERE idGMAA=?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted calAtividad with idGMAA: ", id);
    result(null, res);
  });
};



  module.exports = calActividad;

