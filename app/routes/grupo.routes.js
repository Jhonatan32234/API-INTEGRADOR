

const rateLimit = require('express-rate-limit');
const grupo = require('../controllers/grupo.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')
// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 200, // máximo 50 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.post('/create',verifyToken.verifyToken, grupo.create);
router.get('/all',verifyToken.verifyToken, grupo.findAll);
router.put('/:idGrupo',verifyToken.verifyToken, grupo.update);
router.delete('/:idGrupo',verifyToken.verifyToken, grupo.delete);

module.exports = router;