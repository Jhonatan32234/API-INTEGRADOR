const sql = require('./db.js');

const Logro = function(logro){
    this.nombreLogro = logro.NombreLogro;
    this.bonificacion = logro.Bonificacion;
    this.condicion = logro.Condicion;
}

Logro.create = (newLogro,result)=>{
    sql.query('INSERT INTO logro set ?',newLogro,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Logro: ", { id: res.insertId, ...newLogro });
        result(null, { id: res.insertId, ...newLogro });
    })
}

Logro.getAll = (nombre, result) => {
    let query = "SELECT * FROM logro";
  
    if (nombre) {
      query += ` WHERE NombreLogro LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Logro: ", res);
      result(null, res);
    });
  };

  Logro.remove = (id, result) => {
    sql.query("DELETE FROM logro WHERE idLogro = ?", id, (err, res) => {
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
  
      console.log("deleted Logro with idLogro: ", id);
      result(null, res);
    });
  };
  
  Logro.updateById = (id, logro, result) => {
    sql.query(
      "UPDATE logro SET NombreLogro = ?, Bonificacion = ?, Condicion = ? WHERE idLogro = ?",
      [logro.nombreLogro, logro.bonificacion, logro.condicion, id],
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
  
        console.log("updated Logro: ", { id: id, ...logro });
        result(null, { id: id, ...logro });
      }
    );
  };

  module.exports = Logro;