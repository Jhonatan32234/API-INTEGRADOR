const sql = require('./db.js');

const Alumno = function(alumno){
    this.nombreAlumno = alumno.NombreAlumno;
    this.apellidos = alumno.Apellidos;
    this.edad = alumno.Edad;
    this.sexo = alumno.Sexo;
    this.grupo = alumno.Grupo;
    this.tutor = alumno.Tutor;
    this.contacto = alumno.Contacto;
}

Alumno.create = (newAlumno, result) => {
  sql.query(
      'CALL InsertarAlumno(?, ?, ?, ?, ?, ?, ?)',
      [
          newAlumno.nombreAlumno,
          newAlumno.apellidos,
          newAlumno.edad,
          newAlumno.sexo,
          newAlumno.grupo,
          newAlumno.tutor,
          newAlumno.contacto
      ],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;

          }
          


          console.log("created Alumno: ", { id: res[0][0].id, ...newAlumno });
          result(null, { id: res[0][0].id, ...newAlumno });
      }
  );
}

/*
Alumno.create = (newAlumno,result)=>{
    sql.query('INSERT INTO alumnos set ?',newAlumno,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Alumno: ", { id: res.insertId, ...newAlumno });
        result(null, { id: res.insertId, ...newAlumno });
    })
}*/

Alumno.getAll = (nombre, result) => {
    let query = "SELECT * FROM alumnos";
  
    if (nombre) {
      query += ` WHERE NombreAlumno LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Alumno: ", res);
      result(null, res);
    });
  };

  Alumno.only = (id, result) => {
    sql.query("SELECT idAlumno,NombreAlumno,Apellidos FROM alumnos WHERE Grupo = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Alumno ", res);
      result(null, res);
    });
  };

  Alumno.remove = (id, result) => {
    sql.query("DELETE FROM alumnos WHERE idAlumno = ?", id, (err, res) => {
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
  
      console.log("deleted Alumno with idAlumno: ", id);
      result(null, res);
    });
  };
  
  Alumno.updateById = (id,alumno,result) => {
    sql.query(
      "UPDATE alumnos SET NombreAlumno = ?, Apellidos = ?, Edad = ?,Sexo = ?,Grupo = ?,Tutor = ?, Contacto = ? WHERE idAlumno = ?",
      [alumno.nombreAlumno, alumno.apellidos, alumno.edad,alumno.sexo,alumno.grupo,alumno.tutor,alumno.contacto, id],
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
  
        console.log("updated Alumno: ", { id: id, ...alumno });
        result(null, { id: id, ...alumno });
      }
    );
  };
  



  module.exports = Alumno;