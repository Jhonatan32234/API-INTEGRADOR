module.exports = app =>{

    const examen = require('../controllers/examen.controller.js');
    
     var router = require('express').Router();

     router.post('/create',examen.create);

     router.get('/all',examen.findAll);

     router.put('/:idExamen',examen.update);

     router.delete('/:idExamen',examen.delete);

     app.use('/api/examen',router);
}

