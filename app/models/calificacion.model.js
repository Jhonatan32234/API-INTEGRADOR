const sql = require('./db.js');

const Calificacion = function(calificacion){
    this.data = calificacion.Data
}


Calificacion.finish = (newCalificacion,result) =>{
  console.log(newCalificacion.data[0])
  const data = newCalificacion.data[0]
    sql.query(`SELECT
    a.idAlumno,
    gm.idGM,            
    ga.Corte,
    COUNT(ga.Calificacion) AS Actividades,
    SUM(ga.Calificacion) AS Calificacion
FROM
    gmaalumno ga
    JOIN gmactividad gma ON ga.idGMActividad = gma.idGMActividad
    JOIN grupomateria gm ON gma.idGM = gm.idGM
    JOIN alumnos a ON ga.idAlumno = a.idAlumno
WHERE
    gm.idGrupo = ?    
    AND gm.idMateria = ?
    AND ga.Corte = ?
    AND ga.Calificacion IS NOT NULL
GROUP BY
    a.idAlumno,
    gm.idGM,          
    ga.Corte;`,
        [data.Grupo,data.Materia,data.Corte],
        (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            console.log(res)
            const idAlumno = res.map(item => {return item.idAlumno})
            console.log(idAlumno)
            const calificaciones = res.map(cal => {
              return `
                      WHEN idAlumno = ${cal.idAlumno} and idGM = ${cal.idGM} 
                      then ${cal.Calificacion}`})
            const index = calificaciones.join('\n')
            console.log(index)
            
            sql.query(`update calificacion set ${data.Corte} = case
                ${index} end where idAlumno in (${idAlumno})`, (err2, res2) => {
            if (err2) {
            console.log("error: ", err2);
            result(null, err2);
            return;
            }
            console.log("Calificated alumnos");
            result(null, res);
           
          });

            
  })
}
Calificacion.getAll = (indice, result) => {
    let query = `CALL UpdateAndSelectCalificaciones(?, ?);`;
  
    sql.query(query,[indice.Grupo,indice.Materia], (err, res) => {
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
     ` UPDATE calificacion SET ${calificacion.Corte}=? WHERE idCalificacion = ?`,
      [calificacion.Calificacion, id],
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