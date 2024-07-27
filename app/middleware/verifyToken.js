const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = require('../config/auth.config.js')

exports.verifyToken = (req, res, next) => {
    //console.log(secret.secret)
  const authHeader = req.headers['authorization'];
  //console.log(authHeader)
  if (!authHeader) return res.status(403).send({ message: 'No token provided.'});

  
  jwt.verify(authHeader, secret.secret, (err, decoded) => {
    //console.log(decoded)
    if (err) return res.status(500).send({ message:"Failed to autenticate token."})
        req.userId = decoded.id;
        req.userRole = decoded.roles;
        next();
    });

}