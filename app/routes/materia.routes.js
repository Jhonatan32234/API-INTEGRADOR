

const rateLimit = require('express-rate-limit');
const materia = require('../controllers/materia.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')
// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 10 minutos
  max: 150, // máximo 50 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.post('/create',verifyToken.verifyToken, materia.create);
router.get('/all',verifyToken.verifyToken, materia.findAll);
router.put('/:idMateria',verifyToken.verifyToken, materia.update);
router.delete('/:idMateria',verifyToken.verifyToken, materia.delete);

module.exports = router;
