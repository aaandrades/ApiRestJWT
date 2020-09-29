const express = require('express');
const app = express();

// Esta API rest se conecta a PostSQL, maneja autenticacion basada en token con credenciales:
// usuario: asfo y contrasena: holamundo
// permite realizar todo el CRUD y tiene algunos middleware para validar los ingresos

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//New Routes
app.use(require('./routes/routes'));

app.listen(3001);
console.log('Server on port', 3001);