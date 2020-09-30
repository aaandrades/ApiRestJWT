const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const config = require('../config/config')

app.set('llave', config.llave);

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

module.exports = autenticar;