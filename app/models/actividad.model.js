const sql = require('./db.js');
const Grupo = require('./grupo.model.js');

const Actividad = function(actividad){
  console.log('Guardado'+actividad.NombreActividad)
    this.nombreActividad = actividad.NombreActividad;
    this.valorActividad = actividad.ValorActividad;
    this.grupo = actividad.Grupo;
    this.materia = actividad.Materia;
    this.corte = actividad.Corte;
}


Actividad.create = (newActividad, result) => {

  sql.query('insert into actividad(NombreActividad,ValorActividad,Corte) values(?,?,?)', [newActividad.nombreActividad,newActividad.valorActividad,newActividad.corte], (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created Actividad: ", { id: res.insertId, ...newActividad });
      result(null, { id: res.insertId, ...newActividad });
      let actividadId = res.insertId;
      console.log(newActividad.grupo,newActividad.materia)
      sql.query('SELECT idGM FROM grupomateria WHERE idGrupo = ? AND idMateria = ?', [newActividad.grupo, newActividad.materia], (err2, res2) => {
          if (err2) {
              console.log("error: ", err2);
              result(err2, null);
              return;
          }
          console.log(res2)
          let GM = res2[0].idGM;
          sql.query('INSERT INTO gmactividad (idGM, idActividad) VALUES (?, ?)', [GM, actividadId], (err3, res3) => {
              if (err3) {
                  console.log("error: ", err3);
                  result(err3, null);
                  return;
              }
              sql.query('SELECT idAlumno FROM alumnos WHERE Grupo = ?', [newActividad.grupo], (err4, res4) => {
                  if (err4) {
                      console.log("error: ", err4);
                      result(err4, null);
                      return;
                  }
                  let alumnos = res4.map(alumno => alumno.idAlumno);
                  // Verificar que todos los alumnos existen en la tabla alumnos
                  let values = [];
                  for (let alumnoId of alumnos) {
                      values.push([alumnoId, res3.insertId,newActividad.corte]); // res3.insertId debería ser actividadId
                  }
                  console.log(values)
                  let query2 = 'INSERT INTO gmaalumno (idAlumno, idGMActividad,Corte) VALUES ';
                  query2 += values.map(value => '(?, ?,?)').join(',');
                  sql.query(query2, values.flat(), (err5, res5) => {
                      if (err5) {
                          console.log("error: ", err5);
                          result(err5, null);
                          return;
                      }
                  });
              });
          });
      });
  });
};


Actividad.only = (grupo,materia,corte,result) => {
    sql.query(`select idGM from grupomateria where idGrupo =${grupo}
         and idMateria = ${materia} ;`,(err,res)=>{
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
            const idGM = res[0].idGM;
            console.log(idGM)
            sql.query(`
                SELECT ga.idGMActividad, a.NombreActividad
                FROM gmactividad ga
                INNER JOIN actividad a ON ga.idActividad = a.IdActividad
                WHERE ga.idGM = ${idGM} and a.Corte = '${corte}'
                ORDER BY ga.idGMActividad;`,(err2,res2)=>{
                   if (err2) {
                       console.log("error: ", err2);
                       result(null, err2);
                       return;
                     }
                     console.log("Actividad: ", res2);
                     result(null, res2);
                });
 
            });
}

Actividad.getAll = (nombre, result) => {
    let query = `SELECT a.idActividad, a.NombreActividad, g.idGrupo, g.NombreGrupo, m.idMateria, 
    m.NombreMateria,a.Corte
FROM actividad a
INNER JOIN gmactividad ga ON a.idActividad = ga.idActividad
INNER JOIN grupomateria gm ON ga.idGM = gm.idGM
INNER JOIN grupo g ON gm.idGrupo = g.idGrupo
INNER JOIN materia m ON gm.idMateria = m.idMateria;`;
  
    if (nombre) {
      query += ` WHERE NombreActividad LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Actividad: ", res);
      result(null, res);
    });
  };


  Actividad.remove = (id, result) => {
    console.log("id---"+id)
    sql.query("Select idGMActividad from gmactividad where idActividad=?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
       let idGMA= res[0].idGMActividad;
      sql.query("DELETE FROM gmaalumno WHERE idGMActividad = ?", idGMA, (err2, res2) => {
        if (err2) {
          console.log("error2: ", err2);
          result(null, err2);
          return;
        }
        sql.query("DELETE FROM gmactividad WHERE idActividad = ?", id, (err3, res3) => {
          if (err3) {
            console.log("error3: ", err3);
            result(null, err3);
            return;
          }
          sql.query("DELETE FROM actividad WHERE idActividad = ?", id, (err4, res4) => {
            if (err4) {
              console.log("error4: ", err4);
              result(null, err4);
              return;
            }
            console.log("deleted Actividad with idActividad: ", id);
            result(null, res4);
        
          });
      
        });
    
      });
  
    });
  };


  Actividad.updateById = (id, grupo, materia, actividad, result) => {
    if (grupo == actividad.grupo && materia == actividad.materia) {
        sql.query(
            "update actividad set NombreActividad=?, ValorActividad=?, Corte = ? WHERE idActividad = ?",
            [actividad.nombreActividad, actividad.valorActividad, actividad.corte, id],
            (err5, res5) => {
                if (err5) {
                    console.log("error5: ", err5);
                    result(null, err5);
                    return;
                }
                console.log("Updated Actividad:", { id: id, ...actividad });
                result(null, { id: id, ...actividad });
            });
    }else{
    console.log(grupo+materia)
    sql.query('SELECT idGM FROM grupomateria WHERE idGrupo = ? AND idMateria = ?', [grupo, materia], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        let GM = res[0].idGM;
        console.log(GM+"idgm")

        sql.query('SELECT idGMActividad FROM gmactividad WHERE idGM = ? AND idActividad = ?', [GM, id], (err2, res2) => {
            if (err2) {
                console.log("error2: ", err2);
                result(err2, null);
                return;
            }
            
            let GMA = res2[0].idGMActividad;
            console.log(GMA)

            // Eliminar primero las filas de gmaalumno
            sql.query(`DELETE FROM gmaalumno WHERE idGMActividad = ${GMA}`, (err3, res3) => {
                if (err3) {
                    console.log("error3: ", err3);
                    result(err3, null);
                    return;
                }
                
            
                console.log("Deleted gmaalumno where idGMActividad:", GMA);

                // Después de eliminar gmaalumno, eliminar gmactividad
                sql.query(`delete from gmactividad where idGMActividad = ${GMA}`, (err4, res4) => {
                    if (err4) {
                        console.log("error4: ", err4);
                        result(err4, null);
                        return;
                    }

                    console.log("Deleted gmactividad where idGMActividad:", GMA);

                    // Ahora proceder con la actualización de la actividad
                    sql.query(
                        "update actividad set NombreActividad=?, ValorActividad=?, Corte = ? WHERE idActividad = ?",
                        [actividad.nombreActividad, actividad.valorActividad, actividad.corte, id],
                        (err5, res5) => {
                            if (err5) {
                                console.log("error5: ", err5);
                                result(null, err5);
                                return;
                            }
                            // Si no se encuentra ninguna actividad con el id
                            console.log(actividad.grupo,actividad.materia)
                            sql.query('Select idGM from grupomateria where idGrupo=? and idMateria=?', [actividad.grupo, actividad.materia], (err9, res9) => {
                              if (err9) {
                                  console.log("error6: ", err9);
                                  result(err9, null);
                                  return;
                              }
                             let idgm = res9[0].idGM;
                             console.log(idgm+"idgm")

                            // Insertar nueva fila en gmactividad y gmaalumno
                            sql.query('INSERT INTO gmactividad (idGM, idActividad) VALUES (?, ?)', [idgm, id], (err6, res6) => {
                                if (err6) {
                                    console.log("error6: ", err6);
                                    result(err6, null);
                                    return;
                                }

                                sql.query('SELECT idAlumno FROM alumnos WHERE Grupo = ?', [actividad.grupo], (err7, res7) => {
                                    if (err7) {
                                        console.log("error7: ", err7);
                                        result(err7, null);
                                        return;
                                    }

                                    let alumnos = res7.map(alumno => alumno.idAlumno);
                                    let values = alumnos.map(alumnoId => [alumnoId, res6.insertId,actividad.corte]);

                                    let query2 = 'INSERT INTO gmaalumno (idAlumno, idGMActividad,Corte) VALUES ?';
                                    sql.query(query2, [values], (err8, res8) => {
                                        if (err8) {
                                            console.log("error8: ", err8);
                                            result(err8, null);
                                            return;
                                        }

                                        console.log("Updated Actividad:", { id: id, ...actividad });
                                        result(null, { id: id, ...actividad });
                                      });
                                    });
                                });
                            });
                        }
                    );
                });
            });
        });
    });}
};


/*
  Actividad.updateById = (actividad,grupo,materia, result) => {
    console.log(grupo+materia);
    sql.query('INSERT INTO actividad SET ?', actividad, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created Actividad: ", { id: res.insertId, ...actividad });
      result(null, { id: res.insertId, ...actividad });
      let actividadId = res.insertId;
      sql.query('SELECT idGM FROM grupomateria WHERE idGrupo = ? AND idMateria = ?', [grupo, materia], (err2, res2) => {
          if (err2) {
              console.log("error: ", err2);
              result(err2, null);
              return;
          }
          let GM = res2[0].idGM;
          sql.query('INSERT INTO gmactividad (idGM, idActividad) VALUES (?, ?)', [GM, actividadId], (err3, res3) => {
              if (err3) {
                  console.log("error: ", err3);
                  result(err3, null);
                  return;
              }
              sql.query('SELECT idAlumno FROM alumnos WHERE Grupo = ?', [grupo], (err4, res4) => {
                  if (err4) {
                      console.log("error: ", err4);
                      result(err4, null);
                      return;
                  }
                  let alumnos = res4.map(alumno => alumno.idAlumno);
                  // Verificar que todos los alumnos existen en la tabla alumnos
                  let values = [];
                  for (let alumnoId of alumnos) {
                      values.push([alumnoId, res3.insertId]); // res3.insertId debería ser actividadId
                  }
                  let query2 = 'INSERT INTO gmaalumno (idAlumno, idGMActividad) VALUES ';
                  query2 += values.map(value => '(?, ?)').join(',');
                  sql.query(query2, values.flat(), (err5, res5) => {
                      if (err5) {
                          console.log("error: ", err5);
                          result(err5, null);
                          return;
                      }
                  });
              });
          });
      });
  });
  };
*/
  module.exports = Actividad;
