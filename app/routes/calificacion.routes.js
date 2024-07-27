

const rateLimit = require('express-rate-limit');
const calificacion = require('../controllers/calificacion.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')


// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 50, // máximo 50 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.post('/create',verifyToken.verifyToken, calificacion.create);
router.get('/all',verifyToken.verifyToken, calificacion.findAll);
router.put('/:idCalificacion',verifyToken.verifyToken, calificacion.update);
router.delete('/:idCalificacion',verifyToken.verifyToken, calificacion.delete);

module.exports = router;
