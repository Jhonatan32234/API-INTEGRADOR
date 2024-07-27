module.exports = app =>{

    const conducta = require('../controllers/conducta.controller.js');
    
     var router = require('express').Router();

     router.post('/create',conducta.create);

     router.get('/all',conducta.findAll);

     router.put('/:idConducta',conducta.update);

     router.delete('/:idConducta',conducta.delete);

     app.use('/api/conducta',router);
}

