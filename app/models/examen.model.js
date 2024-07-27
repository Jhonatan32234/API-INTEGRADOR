const sql = require('./db.js');

const Examen = function(examen){
      this.nombreExamen=examen.NombreExamen,
      this.valorExamen=examen.ValorExamen,
      this.calificacionExamen=examen.CalificacionExamen,
      this.reactivos=examen.Reactivos,
      this.aciertos=examen.Aciertos
}

Examen.create = (newExamen,result)=>{
  console.log(newExamen)
    sql.query('INSERT INTO examen set ?',newExamen,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Examen: ", { id: res.insertId, ...newExamen });
        result(null, { id: res.insertId, ...newExamen });
    })
}

Examen.getAll = (nombre, result) => {
    let query = "SELECT * FROM examen";
  
    if (nombre) {
      query += ` WHERE NombreExamen LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Examen: ", res);
      result(null, res);
    });
  };

  Examen.remove = (id, result) => {
    sql.query("DELETE FROM examen WHERE idExamen = ?", id, (err, res) => {
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
  
      console.log("deleted Examen with idExamen: ", id);
      result(null, res);
    });
  };
  
  Examen.updateById = (id, examen, result) => {
    sql.query(
      "UPDATE examen SET NombreExamen = ?, ValorExamen = ?, calificacionExamen = ?,Reactivos = ?,Aciertos = ? WHERE idExamen = ?",
      [examen.nombreExamen, examen.valorExamen, examen.calificacionExamen,examen.reactivos,examen.aciertos, id],
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
  
        console.log("updated Examen: ", { id: id, ...examen });
        result(null, { id: id, ...examen });
      }
    );
  };

  module.exports = Examen;