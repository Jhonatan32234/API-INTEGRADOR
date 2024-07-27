

const rateLimit = require('express-rate-limit');
const alumno = require('../controllers/alumno.controller.js');
const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken.js')
// Definir el rate limit para las rutas de actividad
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100, // máximo 50 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

router.use(apiLimiter);

router.post('/create',verifyToken.verifyToken, alumno.create);
router.get('/all',verifyToken.verifyToken, alumno.findAll);
router.get('/only/:idGrupo',verifyToken.verifyToken, alumno.only);

router.put('/:idAlumno',verifyToken.verifyToken, alumno.update);
router.delete('/:idAlumno',verifyToken.verifyToken, alumno.delete);

module.exports = router;

