
/*

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
    
  );

  app.post("/api/auth/signin", controller.signin);
};
*/

const express = require("express");
const rateLimit = require('express-rate-limit');
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller.js");

const router = express.Router();

// Definir el rate limit para las rutas de autenticación
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100, // máximo 100 peticiones por IP durante windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Aplicar el rate limit a todas las rutas dentro de este enrutador
router.use(apiLimiter);

// Configurar las rutas de autenticación
router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/signin", controller.signin);

module.exports = router;


