const { Router } = require('express');
const router = Router();
const { check } = require("express-validator")
const { getPerson, createPerson, queryPerson, deletePerson, updatePerson } = require('../controllers/index.controller.js');
const { autenticar, rutasProtegidas } = require('../middleware/sesion')

//Route getPerson
router.get('/getPerson', rutasProtegidas, getPerson);

//Route createPerson
router.post('/createPerson', [
        check("id", "El id es obligatorio").not().isEmpty(),
        check("name", "El nombre es obligatorio").not().isEmpty(),
    ],
    createPerson);

//Route query Id for Person
router.get('/consultPerson/:id', [
        check("id", "Ingrese el id del elemento a buscar").not().isEmpty(),
    ],
    queryPerson);
//Route Delete Id for Person
router.delete('/deletePerson/:id', deletePerson);
//Route Update Person
router.put('/updatePerson/:id', updatePerson);

// Autenticate
router.post('/autenticacion', autenticar);


module.exports = router;