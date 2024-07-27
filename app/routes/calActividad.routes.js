/*

module.exports = app =>{

    const calActividad = require('../controllers/calActividad.controller.js');
    
     var router = require('express').Router();

     router.post('/calificate/:idActividad',calActividad.calificate);

     //router.get('/all',calActividad.findAll);

     router.get('/only/:idGMAA',calActividad.only)

    // router.put('/:idActividad/:idGrupo/:idMateria',calActividad.update);

     //router.delete('/:idActividad',actividad.delete);

     app.use('/api/calActividad',router);
}


*/


const rateLimit = require('express-rate-limit');
const calActividad = require('../controllers/calActividad.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')

// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 30, // máximo 100 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.put('/calificate',verifyToken.verifyToken, calActividad.calificate);
router.get('/only/:idGMA',verifyToken.verifyToken,calActividad.only)
router.get('/all',verifyToken.verifyToken, calActividad.findAll);
router.delete('/:idGMAA',verifyToken.verifyToken, calActividad.delete);

module.exports = router;

