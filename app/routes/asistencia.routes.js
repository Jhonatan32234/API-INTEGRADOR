module.exports = app =>{

    const asistencia = require('../controllers/asistencia.controller.js');
    
     var router = require('express').Router();

     router.post('/create',asistencia.create);

     router.get('/all/:idMateria/:idGrupo',asistencia.findAll);

     router.put('/:idAsistencia',asistencia.update);

     router.delete('/:idAsistencia',asistencia.delete);

     app.use('/api/asistencia',router);
}

