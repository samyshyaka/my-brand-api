import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { connectDB } from '../src/config/dbConn.js';
import User from '../src/models/user.js'
import server from '../src/app.js'

dotenv.config();
connectDB();

chai.use(chaiHttp);
chai.should();

describe('LOGIN', () => {
    before((done) => {
        User.deleteMany({}, (err) => {
            done();
         });
    });

    after((done) => {
        User.deleteMany({}, (err) => {
            done();
         });
    });

    describe('LOGIN a user', () => {
        it('it should login a user ', (done) => {
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
                            done();
                        })
                })
        })
    })
})