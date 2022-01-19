process.env.NODE_ENV = 'test';
process.env.MONGOHQ_URL = 'mongodb://localhost/ArticlesDBexTest'

import chai from 'chai';
import chaiHttp from 'chai-http';

import { connectDB } from '../src/config/dbConn.js';
import server from '../src/app.js'

// connectDB();

chai.use(chaiHttp);
chai.should();

let id = "";

describe('/GET article', () => {
    it('it should GET all the articles', (done) => {
          chai.request(server)
          .get('/api/v1/articles')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('articles');
                res.body.data.articles.should.be.a('array');
            done();
          });
    });
});
describe('/POST article', () => {
    it('it should not POST an article without authorization', (done) => {
        const article = {
            title: "The importance of learning computer development",
            author: "Sam",
            content: "Computer development improves creativity"
        }
          chai.request(server)
          .post('/api/v1/articles')
          .send(article)
          .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized');
            done();
          });
    });
    it('it should POST an article ', (done) => {
        // chai.request(server)
        //     .post('/api/v1/users')
        //     .send({
        //         'name': 'Jadon',
        //         'password': 'Sancho'
        //     })
        //     .end((err, res) => {
        //         res.should.have.status(201);
        chai.request(server)
            .post('/api/v1/login')
            .send({
                'name': 'Jadon',
                'password': 'Sancho'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('accessToken');
                const token = res.body.accessToken;
                            
                    const article = {
                        title: "The importance of learning computer development",
                        author: "Sam",
                        content: "Computer development improves creativity"
                    }
                    chai.request(server)
                    .post('/api/v1/articles')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(article)
                    .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.property('data');
                            res.body.data.should.have.property('article');
                            res.body.data.article.should.have.property('_id');
                            res.body.data.article.should.have.property('title');
                            res.body.data.article.should.have.property('author');
                            res.body.data.article.should.have.property('content');
                            id = res.body.data.article._id;
                        done();
                    });
                })
            });
        // });
    });
describe('/GET/:id article', () => {
    it('it should GET the article by the given id', (done) => {
        chai.request(server)
          .get('/api/v1/articles/' + id)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                res.body.data.article.should.have.property('title');
                res.body.data.article.should.have.property('author');
                res.body.data.article.should.have.property('content');
                res.body.data.article.should.have.property('_id').eql(id);
            done();
          });        

    });
});
describe('/PUT/:id article', () => {
    it('it should not UPDATE an article without authorization', (done) => {
              chai.request(server)
              .put('/api/v1/articles/' + id)
              .send({
                  title: "The Chronicles of Narnia", 
                  author: "C.S. Lewis", 
                  content: "The Chronicles of Narnia",                   
                })
              .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Unauthorized');
                done();
              });        
    });
    it('it should UPDATE an article', (done) => {
        // chai.request(server)
        //     .post('/api/v1/users')
        //     .send({
        //         'name': 'Jadon',
        //         'password': 'Sancho'
        //     })
        //     .end((err, res) => {
        //         res.should.have.status(201);
        chai.request(server)
            .post('/api/v1/login')
            .send({
                'name': 'Jadon',
                'password': 'Sancho'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('accessToken');
                const token = res.body.accessToken;


              chai.request(server)
              .put('/api/v1/articles/' + id)
              .set({ Authorization: `Bearer ${token}` })
              .send({
                  title: "The Chronicles of Narnia", 
                  author: "C.S. Lewis", 
                  content: "The Chronicles of Narnia",                   
                })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('article');
                res.body.data.article.should.have.property('title');
                res.body.data.article.should.have.property('author');
                res.body.data.article.should.have.property('content');
                res.body.data.article.should.have.property('_id').eql(id);
                done();
              });        
            });
        });
    // });
});

// Test the /DELETE/:id route

describe('/DELETE/:id article', () => {
    it('it should not DELETE an article without authorization', (done) => {
        chai.request(server)
            .delete('/api/v1/articles/' + id)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized');
                done();
            });
    });
    it('it should DELETE an article', (done) => {
        // chai.request(server)
        //     .post('/api/v1/users')
        //     .send({
        //         'name': 'Jadon',
        //         'password': 'Sancho'
        //     })
        //     .end((err, res) => {
        //         res.should.have.status(201);
        chai.request(server)
            .post('/api/v1/login')
            .send({
                'name': 'Jadon',
                'password': 'Sancho'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('accessToken');
                const token = res.body.accessToken;

        chai.request(server)
            .delete('/api/v1/articles/' + id)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Article deleted');
                done();
            });
        });
    });
// });
});


