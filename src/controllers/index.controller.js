const express = require('express');
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const app = express();
const config = require('../config/config')


// Instanciar Pool para conectarse a PostgreSQL
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'adoptar',
    port: '5432'
});

// Set JWT
app.set('llave', config.llave);

// Metodo de creacion elemento BD
const createPerson = async(req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            body: "Ingrese valores validos",
            ok: false,
            errores: errores.mapped()
        })
    } else {
        const { id, name, birth, email } = req.body;
        const response = await pool.query('INSERT INTO person (id,name,birth,email) VALUES ($1,$2,$3,$4)', [id, name, birth, email]);
        res.json({
            message: 'Persona agregada',
            body: {
                person: { id, name, birth, email }
            }
        })
    }
}

// Metodo para traer elementos de la BD
const getPerson = async(req, res) => {
    const response = await pool.query('SELECT * FROM person');
    //Parce the Json
    res.status(200).json(response.rows);
    // console.log(response.rows);
    // res.send('Consulta de total de Personas');
}

const updatePerson = async(req, res) => {
    const id = req.params.id;
    const { name, birth, email } = req.body;
    console.log(name, birth, email);
    const response = await pool.query('UPDATE person SET name = $1, birth =$2, email=$3 WHERE id=$4', [name, birth, email, id]);
    console.log(response);
    res.status(200).json({
            respuesta: "Persona Actualizada",
            token: "Algun token o valor"
        })
        // res.send('Persona actualizada correctamente');
}

const queryPerson = async(req, res) => {
    // res.send('El ID ingresado es: ' + req.params.id);
    const response = await pool.query('SELECT * FROM person WHERE ID = $1', [req.params.id]);
    console.log(response);
    res.json(response.rows);
}

const deletePerson = async(req, res) => {
    // res.send('Persona eliminada');
    const response = await pool.query('DELETE FROM person WHERE id = $1', [req.params.id]);
    console.log(response);
    res.json(`Persona eliminada con ID ${req.params.id} satisfactoriamente`);
}

//Export Functions
module.exports = {
    getPerson,
    createPerson,
    queryPerson,
    deletePerson,
    updatePerson
}