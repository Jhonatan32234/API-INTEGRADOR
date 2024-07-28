const sql = require('./db.js');

const Materia = function(materia){
    this.nombreMateria = materia.NombreMateria;

}

Materia.create = (newMateria,result)=>{
    sql.query('INSERT INTO materia set ?',newMateria,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Materia: ", { id: res.insertId, ...newMateria });
        result(null, { id: res.insertId, ...newMateria });
    })
}

Materia.getAll = (nombre, result) => {
    let query = "SELECT * FROM materia";
  
    if (nombre) {
      query += ` WHERE NombreMateria LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Materia: ", res);
      result(null, res);
    });
  };





  Materia.remove = (id, result) => {

    sql.query("SELECT idGM from grupomateria WHERE idMateria = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res == 0) {
        sql.query(`DELETE from materia WHERE idMateria=?`,id , (err2, res2) => {
          if (err2) {
            console.log("error: ", err2);
            result(null, err2);
            return;
          }
          console.log("deleted Materia with idMateria: ", id);
            result(null, res2);
          
        });

      }else{
        const idGM = res.map(data =>{return data.idGM})
        console.log(idGM)
        sql.query(`SELECT idGMActividad from gmactividad WHERE idGM in(${idGM})` , (err3, res3) => {
      if (err3) {
        console.log("error: ", err3);
        result(null, err3);
        return;
      }
      if (res3 == 0) {
        sql.query(`DELETE from calificacion WHERE idGM in(${idGM})`,id , (err2, res2) => {
          if (err2) {
            console.log("error: ", err2);
            result(null, err2);
            return;
          }
        });
        sql.query(`DELETE FROM grupomateria where idGM in(${idGM})` , (err4, res4) => {
          if (err4) {
            console.log("error: ", err4);
            result(null, err4);
            return;
          }
          sql.query(`DELETE FROM materia where idMateria=${id}` , (err5, res5) => {
            if (err5) {
              console.log("error: ", err5);
              result(null, err5);
              return;
            }
            console.log("deleted Materia with idMateria: ", id);
            result(null, res5);
          });
        });
      }else {
        const idGMA = res3.map(data=>{return data.idGMActividad})
        console.log(idGMA)
        sql.query(`DELETE from gmaalumno WHERE idGMActividad in(${idGMA})` , (err6, res6) => {
          if (err6) {
            console.log("error: ", err6);
            result(null, err6);
            return;
          }
          sql.query(`DELETE from gmactividad WHERE idGMActividad in(${idGMA})` , (err7, res7) => {
            if (err7) {
              console.log("error: ", err7);
              result(null, err7);
              return;
            }
            sql.query(`DELETE from calificacion WHERE idGM in(${idGM})`,id , (err2, res2) => {
              if (err2) {
                console.log("error: ", err2);
                result(null, err2);
                return;
              }
            });
            sql.query(`DELETE FROM grupomateria where idGM in(${idGM})` , (err8, res8) => {
              if (err8) {
                console.log("error: ", err8);
                result(null, err8);
                return;
              }
              sql.query(`DELETE FROM materia where idMateria=${id}` , (err9, res9) => {
                if (err9) {
                  console.log("error: ", err9);
                  result(null, err9);
                  return;
                }
                console.log("deleted Materia with idMateria: ", id);
                result(null, res9);

              });
            });           
          });
          
        });
      }
      
    });
      }
      
    });
  };
  


  /*sql.query(`SELECT idGMActividad from gmactividad WHERE idGM in(${idGM})` , (err2, res2) => {
          if (err2) {
            console.log("error: ", err2);
            result(null, err2);
            return;
          }
          
          
        });

        console.log(res2) */
  
  Materia.updateById = (id, materia, result) => {
    sql.query(
      "UPDATE materia SET NombreMateria = ? WHERE IdMateria = ?",
      [materia.nombreMateria,  id],
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
  
        console.log("updated Materia: ", { id: id, ...materia });
        result(null, { id: id, ...materia });
      }
    );
  };

  module.exports = Materia;