// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

process.env.NODE_ENV = 'test'

//Require the dev-dependencies
let chai = require('chai');
var expect = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('./src/app');
let should = chai.should();

let mw = require('./src/middleware/middleware');
let sinon = require('sinon');

chai.use(chaiHttp);


describe('my middleware', function() {

    describe('request handler creation', function() {

        it('should return a function()', function() {
            console.log(typeof(mw));
            expect(mw).to.be.a('function');
        });

        it('should accept three arguments', function() {
            expect(mw.length).to.equal(3);
        });
    });

    describe('request handler calling', function() {
        it('should call next() once', function() {
            var nextSpy = sinon.spy();
            mw({ headers: "asdasdasd" }, { mensaje: "token no proveída" }, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
    });

    describe('request handler calling', function() {
        it('should call next() once', function() {
            var nextSpy = sinon.spy();
            mw({
                headers: { "access-token": "token-no-valido" }
            }, { mensaje: "token no proveída" }, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
    });

});


//Our parent block
describe('Person', () => {

    // Testing the autentication method
    describe('/POST autenticate', () => {
        it('given an user wrong and password when POST request then return error of login', (done) => {
            let person = {
                usuario: "usuarioIncorrecto",
                contrasena: "holamundo",
            }
            chai.request(server)
                .post('/autenticacion')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('mensaje').eql('Usuario o contraseña incorrectos');
                    done();
                });
        });
    });

    // Testing the autentication method
    describe('/POST autenticate', () => {
        it('given the correct user and password when POST request then return the JWT', (done) => {
            let person = {
                usuario: "asfo",
                contrasena: "holamundo",
            }
            chai.request(server)
                .post('/autenticacion')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('mensaje').eql('Autenticación correcta');
                    done();
                });
        });
    });


    // Test the /GET route
    describe('/GET people', () => {
        it('given a GET request when the user call the api then get all users', (done) => {
            chai.request(server)
                .get('/getPerson')
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(typeof(res.body));
                    res.body.should.be.a('array');
                    // Cantidad de elementos de la respuesta
                    res.body.length.should.be.eql(16);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST person', () => {
        it('Given a new user petition when make a POST request then create a new user', (done) => {
            let person = {
                id: "111001",
                name: "J.R.R. Tolkien",
                birth: "1954/12/12",
                email: "creacion@correo.com"
            }
            chai.request(server)
                .post('/createPerson')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.equal('Persona agregada');
                    res.body.body.person.should.have.property('id');
                    res.body.body.person.should.have.property('name');
                    done();
                });
        });
    });

    describe('/GET/:id person', () => {
        it('Given an ID when GET request then return the user', (done) => {
            id = 111001;
            chai.request(server)
                .get('/consultPerson/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('title');
                    // res.body.should.have.property('author');
                    // res.body.should.have.property('pages');
                    // res.body.should.have.property('year');
                    // res.body.should.have.property('_id').eql(book.id);
                    done();
                });

        });
    });

    // Testing bad request
    describe('/POST person', () => {
        it('Given a new user petition when make a POST request then create a new user', (done) => {
            let person = {
                id: "111001",
                birth: "1954/12/12",
                email: "creacion@correo.com"
            }
            chai.request(server)
                .post('/createPerson')
                .send(person)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.body.should.be.equal('Ingrese valores validos');
                    done();
                });
        });
    });

    // Test the /UPDATE
    describe('/PUT/:id person', () => {
        it('given an ID when a PUT request are made then update the user', (done) => {
            id = "111001"
            chai.request(server)
                .put('/updatePerson/' + id)
                .send({ name: "nombre en la prueba", birth: "1990/10/10", email: "correo@borrado" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('respuesta').eql('Persona Actualizada');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id person', () => {
        it('given an ID when a DELETE request are made then delete the user', (done) => {
            id = "111001";
            chai.request(server)
                .delete('/deletePerson/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(res.body);
                    // res.body.should.be.a('object');
                    res.body.should.be.equal(`Persona eliminada con ID ${id} satisfactoriamente`);
                    done();
                });
        });
    });
});


// const sqlResponseFile = path.join(__dirname, '../resources/response-200-WorkDocTypology.json');
// const sqlResponse = fs.readFileSync(sqlResponseFile, 'utf8').toString();

// function QueryMocked(sql: string, options ? : object) {
//     return JSON.parse(sqlResponse);
// }

// sinon.replace(sequelizePostgreSQL, 'query', QueryMocked);

// {
//     "workDocTypologyReturn": [{
//             "typeid": 3,
//             "typetypology": "CC Devolución Documento Inavlido",
//             "descriptiontypology": "Se devuelve documento ya que no cumple con los estándares"
//         },
//         {
//             "typeid": 4,
//             "typetypology": "CC Devolución Sin Formato",
//             "descriptiontypology": "Se devuelve documento ya que no cumple con los estándares del formato"
//         }
//     ]