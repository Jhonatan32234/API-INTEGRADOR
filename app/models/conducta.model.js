const sql = require('./db.js');

const Conducta = function(conducta){
    this.fecha = conducta.Fecha;
    this.titulo = conducta.Titulo;
    this.descripcion = conducta.Descripcion;
    this.conducta = conducta.Conducta;
}

Conducta.create = (newConducta,result)=>{
    sql.query('INSERT INTO conducta set ?',newConducta,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Conducta: ", { id: res.insertId, ...newConducta });
        result(null, { id: res.insertId, ...newConducta });
    })
}

Conducta.getAll = (titulo, result) => {
    let query = "SELECT * FROM conducta";
  
    if (titulo) {
      query += ` WHERE Titulo LIKE '%${titulo}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Conducta: ", res);
      result(null, res);
    });
  };

  Conducta.remove = (id, result) => {
    sql.query("DELETE FROM conducta WHERE idConducta = ?", id, (err, res) => {
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
  
      console.log("deleted Conducta with idConducta: ", id);
      result(null, res);
    });
  };
  
  Conducta.updateById = (id, conducta, result) => {
    sql.query(
      "UPDATE conducta SET Fecha = ?,Titulo = ?, Descripcion = ?, Conducta = ? WHERE idConducta = ?",
      [conducta.fecha, conducta.titulo, conducta.descripcion,conducta.conducta, id],
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
  
        console.log("updated Conducta: ", { id: id, ...conducta });
        result(null, { id: id, ...conducta });
      }
    );
  };

  module.exports = Conducta;