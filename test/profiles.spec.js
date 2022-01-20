import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { connectDB } from '../src/config/dbConn.js';
import Profile from '../src/models/profile.js'
import User from '../src/models/user.js'
import server from '../src/app.js'

dotenv.config();
connectDB();

chai.use(chaiHttp);
chai.should();

let id = "";

describe('Profile', () => {
    before((done) => {
        Profile.deleteMany({}, (err) => {
        });
        User.deleteMany({}, (err) => {
            done();
         });
    });

    after((done) => {
        Profile.deleteMany({}, (err) => {
        });
        User.deleteMany({}, (err) => {
            done();
         });
    });

    describe('/GET profile', () => {
        it('it should GET all the profiles', (done) => {
            chai.request(server)
            .get('/api/v1/profiles')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('profiles');
                    res.body.data.profiles.should.be.a('array');
                done();
            });
        });
    });
    describe('/POST profile', () => {
        it('it should not create a profile without authorization', (done) => {
            const profile = {
                name: "Samuel",
                whatIDo: "Software developer",
                email: "samuelshyaka@gmail.com"
            }
            chai.request(server)
            .post('/api/v1/profiles')
            .send(profile)
            .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Unauthorized');
                done();
            });
        });
        it('it should create a profile ', (done) => {
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
                                
                        const profile = {
                            name: "Samuel",
                            whatIDo: "Software engineer",
                            email: "samuelshyaka@gmail.com"
                        }
                        chai.request(server)
                        .post('/api/v1/profiles')
                        .set({ Authorization: `Bearer ${token}` })
                        .send(profile)
                        .end((err, res) => {
                                res.should.have.status(201);
                                res.body.should.be.a('object');
                                res.body.should.have.property('data');
                                res.body.data.should.have.property('profile');
                                res.body.data.profile.should.have.property('_id');
                                res.body.data.profile.should.have.property('name');
                                res.body.data.profile.should.have.property('whatIDo');
                                res.body.data.profile.should.have.property('email');
                                id = res.body.data.profile._id;
                            done();
                        });
                    })
                });
            });
        });
    describe('/GET/:id profile', () => {
        it('it should GET the profile by the given id', (done) => {
            chai.request(server)
            .get('/api/v1/profiles/' + id)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('profile');
                    res.body.data.profile.should.have.property('name');
                    res.body.data.profile.should.have.property('whatIDo');
                    res.body.data.profile.should.have.property('email');
                    res.body.data.profile.should.have.property('_id').eql(id);
                done();
            });        

        });
    });
    describe('/PUT/:id profile', () => {
        it('it should not UPDATE a profile without authorization', (done) => {
                chai.request(server)
                .put('/api/v1/profiles/' + id)
                .send({
                    name: "Samuel",
                    whatIDo: "Software developer",
                    email: "samuelshyaka@gmail.com"                   
                    })
                .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Unauthorized');
                    done();
                });        
        });
        it('it should UPDATE a profile', (done) => {
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
                .put('/api/v1/profiles/' + id)
                .set({ Authorization: `Bearer ${token}` })
                .send({
                    name: "Samuel",
                    whatIDo: "Software developer",
                    email: "samuelshyaka@gmail.com"                   
                    })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('profile');
                    res.body.data.profile.should.have.property('name');
                    res.body.data.profile.should.have.property('whatIDo');
                    res.body.data.profile.should.have.property('email');
                    res.body.data.profile.should.have.property('_id').eql(id);
                    done();
                });        
            });
        });    
    });

    // Test the /DELETE/:id route

    describe('/DELETE/:id profile', () => {
        it('it should not DELETE a profile without authorization', (done) => {
            chai.request(server)
                .delete('/api/v1/profiles/' + id)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Unauthorized');
                    done();
                });
        });
        it('it should DELETE a profile', (done) => {
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
                .delete('/api/v1/profiles/' + id)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Profile deleted');
                    done();
                });
            });
        });
    });
});


