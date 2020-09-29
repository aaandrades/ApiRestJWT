"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var _require2 = require('../controllers/index.controller.js'),
    getPerson = _require2.getPerson,
    createPerson = _require2.createPerson,
    queryPerson = _require2.queryPerson,
    deletePerson = _require2.deletePerson,
    updatePerson = _require2.updatePerson; //Route getPerson


router.get('/getPerson', getPerson); //Route createPerson

router.post('/createPerson', createPerson); //Route query Id for Person

router.get('/consultPerson/:id', queryPerson); //Route Delete Id for Person

router["delete"]('/deletePerson/:id', deletePerson); //Route Update Person

router.put('/updatePerson/:id', updatePerson);
module.exports = router;