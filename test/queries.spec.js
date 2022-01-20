import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { connectDB } from '../src/config/dbConn.js';
import Query from '../src/models/query.js'
import User from '../src/models/user.js'
import server from '../src/app.js'

dotenv.config();
connectDB();

chai.use(chaiHttp);
chai.should();

let id = "";

describe('Query', () => {
    before((done) => {
        Query.deleteMany({}, (err) => {
        });
        User.deleteMany({}, (err) => {
            done();
         });
    });

    after((done) => {
        Query.deleteMany({}, (err) => {
        });
        User.deleteMany({}, (err) => {
            done();
         });
    });

    describe('/GET query', () => {
        it('it should not retrieve a list of queries without authorization', (done) => {
            chai.request(server)
            .get('/api/v1/queries')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized');
                done();
            });
        });

        it('it should retrieve a list of queries ', (done) => {
            chai.request(server)
                .post('/api/v1/users')
                .send({
                    'email': 'jadoncsancho@gmail.com',
                    'password': 'Sancho25'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    chai.request(server)
                        .post('/api/v1/login')
                        .send({
                            'email': 'jadoncsancho@gmail.com',
                            'password': 'Sancho25'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('accessToken');
                            const token = res.body.accessToken;
                                
                                chai.request(server)
                                .get('/api/v1/queries')
                                .set({ Authorization: `Bearer ${token}` })
                                .end((err, res) => {
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('data');
                                    res.body.data.should.have.property('queries');
                                    res.body.data.queries.should.be.a('array');
                                    done();
                                });
                        })
                    });
                });
             });

    describe('/POST query', () => {
        it('it should POST a query', (done) => {
            const query = {
                name: "Jadon Sancho",
                email: "jadonsancho@gmail.com",
                message: "I want to hire you"
            }
            chai.request(server)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('query');
                res.body.data.query.should.have.property('_id');
                res.body.data.query.should.have.property('name');
                res.body.data.query.should.have.property('email');
                res.body.data.query.should.have.property('message');
                id = res.body.data.query._id;
                done();
            });
        });
    });
    
    describe('/GET/:id query', () => {
        it('it should not GET the query by the given id without authorization', (done) => {
            chai.request(server)
            .get('/api/v1/queries/' + id)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized');
                done();
            });        

        });
        it('it should GET the query by the given id ', (done) => {             
                    chai.request(server)
                        .post('/api/v1/login')
                        .send({
                            'email': 'jadoncsancho@gmail.com',
                            'password': 'Sancho25'
                        })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    const token = res.body.accessToken;
                                
                        chai.request(server)
                        .get('/api/v1/queries/' + id)
                        .set({ Authorization: `Bearer ${token}` })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('data');
                            res.body.data.should.have.property('query');
                            res.body.data.query.should.have.property('name');
                            res.body.data.query.should.have.property('email');
                            res.body.data.query.should.have.property('message');
                            res.body.data.query.should.have.property('_id').eql(id);
                            done();
                        });
                });
            });
        });

    // Test the /DELETE/:id route

    describe('/DELETE/:id query', () => {
        it('it should not DELETE a query without authorization', (done) => {
            chai.request(server)
                .delete('/api/v1/queries/' + id)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Unauthorized');
                    done();
                });
        });
        it('it should DELETE a query', (done) => {
            chai.request(server)
                .post('/api/v1/login')
                .send({
                    'email': 'jadoncsancho@gmail.com',
                    'password': 'Sancho25'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    const token = res.body.accessToken;

            chai.request(server)
                .delete('/api/v1/queries/' + id)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Query deleted');
                    done();
                });
            });
        });
    });
});


