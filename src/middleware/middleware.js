const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const config = require('../config/config')


app.set('llave', config.llave);


// MiddleWare para controlar la autenticacion
module.exports = function rutasProtegidas(req, res, next) {
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
};