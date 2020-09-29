const express = require('express');
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const app = express();
const config = require('../config/config')




//Instance Pool to connect PostgreSQL
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

// Metodo de autenticacion con JWT que expira en 24 horas
const autenticar = async(req, res) => {
    if (req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" })
    }
}

// MiddleWare to control the autentication
const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
});






// Async function to request the Database
const getPerson = async(req, res) => {
    // CRUD / READ
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
    // CRUD / UPDATE
    const response = await pool.query('UPDATE person SET name = $1, birth =$2, email=$3 WHERE id=$4', [name, birth, email, id]);
    console.log(response);
    res.send('Persona actualizada correctamente');
}

const queryPerson = async(req, res) => {
    // res.send('El ID ingresado es: ' + req.params.id);
    // CRUD / READ
    const response = await pool.query('SELECT * FROM person WHERE ID = $1', [req.params.id]);
    console.log(response);
    res.json(response.rows);
}

const deletePerson = async(req, res) => {
    // res.send('Persona eliminada');
    // CRUD / DELETE
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
    updatePerson,
    autenticar,
    rutasProtegidas
}