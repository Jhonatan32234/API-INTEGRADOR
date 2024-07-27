const { INTEGER } = require('sequelize');
const sql = require('./db.js');

const Asistencia = function(asistencia){
    this.fecha = asistencia.Fecha;
    this.asistio = asistencia.Asistio;
    
}

Asistencia.create = (newAsistencia,result)=>{
    sql.query('INSERT INTO asistencia set ?',newAsistencia,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Asistencia: ", { id: res.insertId, ...newAsistencia });
        result(null, { id: res.insertId, ...newAsistencia });
    })
}


Asistencia.getAll = (idMateria, idGrupo, callback) => {
 idMateria = parseInt(idMateria)
 idGrupo = parseInt(idGrupo)
  let query = "SET @sql = NULL;";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    query = "SET SESSION group_concat_max_len = 10000;";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
      query = "SELECT GROUP_CONCAT(DISTINCT CONCAT('MAX(CASE WHEN fechaAsistencia = \"', fechaAsistencia, '\" THEN asistio ELSE 0 END) AS \"', fechaAsistencia,'\"') ORDER BY fechaAsistencia) INTO @sql FROM asistencia;";
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          callback(err, null);
          return;
        }
        query = "SET @sql = CONCAT('SELECT a.idAlumno, a.NombreAlumno, ', @sql, ' FROM asistencia AS asis JOIN alumnos AS a ON asis.idAlumno = a.idAlumno WHERE asis.idMateria = ? AND asis.idGrupo = ? GROUP BY a.idAlumno, a.NombreAlumno ORDER BY a.idAlumno');";
        sql.query(query, [idMateria, idGrupo], (err, res) => {
          if (err) {
            console.log("error: ", err);
            callback(err, null);
            return;
          }
          query = "PREPARE stmt FROM @sql;";
          sql.query(query, (err, res) => {
            if (err) {
              console.log("error: ", err);
              callback(err, null);
              return;
            }
            query = "EXECUTE stmt USING ?, ?;";
            sql.query(query, [idMateria, idGrupo], (err, res) => {
              if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
              }
              query = "DEALLOCATE PREPARE stmt;";
              sql.query(query, (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  callback(err, null);
                  return;
                }
                console.log("Asistencia: ", res);
                callback(null, res);
              });
            });
          });
        });
      });
    });
  });
};

/*
Asistencia.getAll = (idMateria, idGrupo, callback) => {
  console.log(idMateria)
  const query = `SET @sql = NULL; SET SESSION group_concat_max_len = 10000; SELECT GROUP_CONCAT(DISTINCT CONCAT('MAX(CASE WHEN fechaAsistencia = "', fechaAsistencia, '" THEN asistio ELSE 0 END) AS "', fechaAsistencia,'"')ORDER BY fechaAsistencia) INTO @sql FROM asistencia; SET @sql = CONCAT('SELECT a.idAlumno, a.NombreAlumno, ', @sql, ' FROM asistencia AS asis JOIN alumnos AS a ON asis.idAlumno = a.idAlumno WHERE asis.idMateria = ? AND asis.idGrupo = ? GROUP BY a.idAlumno, a.NombreAlumno ORDER BY a.idAlumno'); PREPARE stmt FROM @sql; EXECUTE stmt USING idMateria, idGrupo; DEALLOCATE PREPARE stmt;`;
  
  sql.query(query, [idMateria, idGrupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    console.log("Asistencia: ", res);
    callback(null, res);
  });
};*/

/*
Asistencia.getAll = (fecha, result) => {
  const query = "select * from asistencia";
  if (fecha) {
      query += ` WHERE Fecha LIKE '%${fecha}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Asistencia: ", res);
      result(null, res);
    });
  };
 */


  
  Asistencia.updateById = (id, asistencia, result) => {
    sql.query(
      "UPDATE asistencia SET Fecha = ?, Asistio = ? WHERE idAsistencia = ?",
      [asistencia.fecha, asistencia.asistio, id],
      (err, res) => {
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
  
        console.log("updated Asistencia: ", { id: id, ...asistencia });
        result(null, { id: id, ...asistencia });
      }
    );
  };

  module.exports = Asistencia;