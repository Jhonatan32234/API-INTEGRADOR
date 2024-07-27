
const rateLimit = require('express-rate-limit');
const actividad = require('../controllers/actividad.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')

// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 20, // máximo 20 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.post('/create',verifyToken.verifyToken, actividad.create,);
router.get('/all',verifyToken.verifyToken, actividad.findAll);
router.post('/only/:idGrupo/:idMateria',verifyToken.verifyToken,actividad.only)
router.put('/:idActividad/:Grupo/:Materia',verifyToken.verifyToken, actividad.update);
router.delete('/:idActividad',verifyToken.verifyToken, actividad.delete);

module.exports = router;




