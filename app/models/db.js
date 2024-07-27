const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  insecureAuth:true
});


/*
connection.connect(error=>{
  if(error)throw error;
  console.log("Conexion a la base de datos exitoso")
});*/

module.exports = connection;
