"use strict";

//Instance Pool to connect PostgreSQL
var _require = require('pg'),
    Pool = _require.Pool;

var _require2 = require('express'),
    request = _require2.request;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'adoptar',
  port: '5432'
});

var createPerson = function createPerson(req, res) {
  var _req$body, id, name, birth, email, response;

  return regeneratorRuntime.async(function createPerson$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, name = _req$body.name, birth = _req$body.birth, email = _req$body.email; // console.log(`El id creado es: ${id}`);
          // CRUD / CREATE

          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO person (id,name,birth,email) VALUES ($1,$2,$3,$4)', [id, name, birth, email]));

        case 3:
          response = _context.sent;
          console.log(response);
          res.json({
            message: 'Persona agregada',
            body: {
              person: {
                id: id,
                name: name,
                birth: birth,
                email: email
              }
            }
          });
          res.send('Persona agregada!');

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Async function to request the Database


var getPerson = function getPerson(req, res) {
  var response;
  return regeneratorRuntime.async(function getPerson$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM person'));

        case 2:
          response = _context2.sent;
          //Parce the Json
          res.status(200).json(response.rows); // console.log(response.rows);
          // res.send('Consulta de total de Personas');

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var updatePerson = function updatePerson(req, res) {
  var id, _req$body2, name, birth, email, response;

  return regeneratorRuntime.async(function updatePerson$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, birth = _req$body2.birth, email = _req$body2.email;
          console.log(name, birth, email); // CRUD / UPDATE

          _context3.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE person SET name = $1, birth =$2, email=$3 WHERE id=$4', [name, birth, email, id]));

        case 5:
          response = _context3.sent;
          console.log(response);
          res.send('Persona actualizada correctamente');

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var queryPerson = function queryPerson(req, res) {
  var response;
  return regeneratorRuntime.async(function queryPerson$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM person WHERE ID = $1', [req.params.id]));

        case 2:
          response = _context4.sent;
          console.log(response);
          res.json(response.rows);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deletePerson = function deletePerson(req, res) {
  var response;
  return regeneratorRuntime.async(function deletePerson$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(pool.query('DELETE FROM person WHERE id = $1', [req.params.id]));

        case 2:
          response = _context5.sent;
          console.log(response);
          res.json("Persona eliminada con ID ".concat(req.params.id, " satisfactoriamente"));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //Export Functions


module.exports = {
  getPerson: getPerson,
  createPerson: createPerson,
  queryPerson: queryPerson,
  deletePerson: deletePerson,
  updatePerson: updatePerson
};