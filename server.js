/*const express = require("express");
const https = require("https")


const cors = require("cors");
const app = express();
app.use('/api/');
app.get('/api/data', (req, res) => {
  res.json({ message: 'API data response' });
  });
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Integrador application." });
});

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/actividad.routes.js")(app);
require("./app/routes/alumno.routes.js")(app);
require("./app/routes/asistencia.routes.js")(app);
require("./app/routes/conducta.routes.js")(app);
require("./app/routes/examen.routes.js")(app);
require("./app/routes/grupo.routes.js")(app);
require("./app/routes/logro.routes.js")(app);
require("./app/routes/materia.routes.js")(app);
require("./app/routes/calificacion.routes.js")(app);

require("./app/routes/calActividad.routes.js")(app);


require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);
/*
https.createServer(options, app).listen(8080, () => {
  console.log('Servidor HTTPS corriendo en el puerto 8080');
  });
*//*

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "docente"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
}*/


const express = require("express");
const cors = require("cors");
const actividadRoutes = require("./app/routes/actividad.routes.js");
const alumnoRoutes = require('./app/routes/alumno.routes.js');
const calificacionRoutes = require('./app/routes/calificacion.routes.js')
const grupoRoutes = require('./app/routes/grupo.routes.js')
const logroRoutes = require('./app/routes/logro.routes.js')
const materiaRoutes = require('./app/routes/materia.routes.js')
const userRoutes = require("./app/routes/user.routes.js")
const authRoutes = require("./app/routes/auth.routes.js");
const calActividadRoutes = require('./app/routes/calActividad.routes.js')


const app = express();

// Configuración de cors
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync();

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Integrador application." });
});


app.use("/api/actividad", actividadRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/calificacion", calificacionRoutes);
app.use("/api/grupo", grupoRoutes);
app.use("/api/logro", logroRoutes);
app.use("/api/materia", materiaRoutes);
app.use("/api/calActividad", calActividadRoutes);

app.use("/", userRoutes);
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "docente",
  });
  Role.create({
    id: 2,
    name: "admin",
  });
}
