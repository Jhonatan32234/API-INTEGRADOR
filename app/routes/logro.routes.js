


const rateLimit = require('express-rate-limit');
const logro = require('../controllers/logro.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')
// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 30, // máximo 30 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Definir las rutas específicas de actividad
router.post('/create',verifyToken.verifyToken, logro.create);
router.get('/all',verifyToken.verifyToken, logro.findAll);
router.put('/:idLogro',verifyToken.verifyToken, logro.update);
router.delete('/:idLogro',verifyToken.verifyToken, logro.delete);

module.exports = router;