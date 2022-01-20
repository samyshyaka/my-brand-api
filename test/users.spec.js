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

describe('User', () => {
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

    describe('/POST user', () => {
        it('it should create a user ', (done) => {
            chai.request(server)
                .post('/api/v1/users')
                .send({
                    'email': 'jadoncsancho@gmail.com',
                    'password': 'Sancho25'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('user');
                    res.body.data.user.should.have.property('_id');
                    res.body.data.user.should.have.property('email');
                    done();        
                })
        });
    })
})