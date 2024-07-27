const { INSERT } = require('sequelize/lib/query-types');
const sql = require('./db.js');

const Grupo = function(grupo){
    this.nombreGrupo = grupo.NombreGrupo;
    this.materias = JSON.stringify(grupo.Materias);
}
/*

Grupo.create = (newGrupo,result)=>{
  console.log(newGrupo.nombreGrupo)
  console.log("AQUOIIIIIIIII")
  
    sql.query('INSERT INTO grupo (NombreGrupo) values(?)',[newGrupo.nombreGrupo],(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
        result(null, { id: res.insertId, ...newGrupo });
        const idgrupo = res.insertId;
        console.log(idgrupo)
    console.log(JSON.parse(newGrupo.materias)[0].idMateria)
    const values = JSON.parse(newGrupo.materias).map(grupo =>
    [idgrupo,grupo.idMateria]);
    sql.query('INSERT INTO grupomateria (idGrupo,idMateria) values (?,?) ',[values],(err,res)=>{
      if(err){
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: res.insertId, ...newGrupo });
  });
    });
    
    
    
}*/
/*
Grupo.create = (newGrupo, result) => {
  console.log(newGrupo.nombreGrupo);
  console.log("AQUOIIIIIIIII");

  sql.query('INSERT INTO grupo (NombreGrupo) values(?)', [newGrupo.nombreGrupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
    result(null, { id: res.insertId, ...newGrupo });
    const idgrupo = res.insertId;
    console.log(idgrupo);

    const values = JSON.parse(newGrupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
    let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
    query += values.map(value => '(?, ?)').join(', ');

    sql.query(query, values.flat(), (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: res.insertId, ...newGrupo });
    });
  });
};
*/

Grupo.create = (newGrupo, result) => {

  sql.query('INSERT INTO grupo (NombreGrupo) values(?)', [newGrupo.nombreGrupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const idres = res.insertId;
    console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
    const idgrupo = res.insertId;
    console.log(idgrupo);

    const values = JSON.parse(newGrupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
    let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
    query += values.map(value => '(?, ?)').join(', ');

    sql.query(query, values.flat(), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: idres, ...newGrupo });
    });
  });
};

/*
Grupo.getAll = (nombre, result) => {
    let query = "SELECT * FROM grupo";
  
    if (nombre) {
      query += ` WHERE NombreGrupo LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Grupo: ", res);
      result(null, res);
    });
  };*/




  
  Grupo.getAll = (nombre, result) => {
    let query = `
        SELECT 
            g.idGrupo,
            g.NombreGrupo,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idMateria', gm.idMateria,  -- Mostrar el idMateria
                    'materia', CASE WHEN gm.idMateria IS NOT NULL THEN m.NombreMateria ELSE NULL END
                )
            ) AS Materias
        FROM grupo g
        LEFT JOIN grupomateria gm ON g.idGrupo = gm.idGrupo
        LEFT JOIN materia m ON gm.idMateria = m.idMateria
        GROUP BY g.idGrupo, g.NombreGrupo;
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error en consulta principal: ", err);
            result(err, null);
            return;
        }

        // Procesar cada fila para ajustar el resultado
        const formattedResult = res.map(row => {
            // Parsear el campo Materias como objeto JavaScript
            const materias = JSON.parse(row.Materias);

            return {
                idGrupo: row.idGrupo,
                NombreGrupo: row.NombreGrupo,
                Materias: materias.map(materia => ({
                    idMateria: materia.idMateria,  // Incluir el idMateria en cada materia
                    materia: materia.materia
                }))
            };
        });

        console.log("Consulta preparada y ejecutada exitosamente.");
        console.log("Resultado formateado:");
        console.log(formattedResult);

        result(null, formattedResult);
    });
};


  

  Grupo.remove = (id, result) => {
    sql.query("SELECT idGM FROM grupomateria WHERE idGrupo = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const idGM = res.map(data=>{return data.idGM})
      console.log(idGM)

      sql.query(`SELECT idGMActividad FROM gmactividad WHERE idGM in(${idGM})`, (err2, res2) => {
      if (err2) {
        console.log("error: ", err2);
        result(null, err2);
        return;
      }
      if (res2 == 0) {
        sql.query(`DELETE FROM grupomateria WHERE idGM in(${idGM})` , (err3, res3) => {
          if (err3) {
            console.log("error: ", err3);
            result(null, err3);
            return;
          }
          sql.query(`DELETE from grupo WHERE idGrupo = ${id}` , (err4, res4) => {
            if (err4) {
              console.log("error: ", err4);
              result(null, err4);
              return;
            }
            console.log("deleted GRUPO with idGrupo: ", id);
            result(null, res4);
          });
        });
      }else{
        const idGMActividad = res2.map(data=>{return data.idGMActividad});
        sql.query(`DELETE from gmaalumno WHERE idGMActividad in(${idGMActividad})` , (err5, res5) => {
          if (err5) {
            console.log("error: ", err5);
            result(null, err5);
            return;
          }
          sql.query(`DELETE from gmactividad WHERE idGMActividad in(${idGMActividad})` , (err6, res6) => {
            if (err6) {
              console.log("error: ", err6);
              result(null, err6);
              return;
            }
            sql.query(`DELETE from grupomateria WHERE idGM in(${idGM})` , (err7, res7) => {
              if (err7) {
                console.log("error: ", err7);
                result(null, err7);
                return;
              }
              sql.query(`DELETE from grupo WHERE idGrupo = ?`,id , (err8, res8) => {
                if (err8) {
                  console.log("error: ", err8);
                  result(null, err8);
                  return;
                }
                console.log("deleted Grupo with idGrupo: ", id);
                result(null, res8);               
              });              
            });           
          });                  
        });              
      }     
    });
    });
  };



  Grupo.updateById = (id,grupo, result) => {

    sql.query('UPDATE grupo SET NombreGrupo=? WHERE idGrupo = ?',
       [grupo.nombreGrupo,id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const idres = id;
      console.log("updated Grupo: ", { id: id, ...grupo });
      const idgrupo = id;
      console.log(idgrupo);
  
      const values = JSON.parse(grupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
      console.log(values)
      let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
      query += values.map(value => '(?, ?)').join(', ');
  
      sql.query(query, values.flat(), (err, res) => {
          if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, { id: idres, ...grupo });
      });
    });
  };
  module.exports = Grupo;