process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/app.js'

chai.use(chaiHttp);
chai.should();

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
        let article = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            content: "The lord of the rings"
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
    // it('it should POST a article ', (done) => {
    //     let article = {
    //         title: "The Lord of the Rings",
    //         author: "J.R.R. Tolkien",
    //         content: "The lord of the rings"
    //     }
    //       chai.request(server)
    //       .post('/api/v1/articles')
    //       .send(article)
    //       .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('data');
    //             res.body.data.should.have.property('article');
    //             res.body.data.article.should.have.property('title');
    //             res.body.data.article.should.have.property('author');
    //             res.body.data.article.should.have.property('content');
    //         done();
    //       });
    // });
});
describe('/GET/:id article', () => {
    it('it should GET the article by the given id', (done) => {
        let id = "61e4014690b12add9ba7b332"
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
        let id = "61e4014690b12add9ba7b332"
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
});
/*
* Test the /DELETE/:id route
*/
describe('/DELETE/:id article', () => {
    it('it should not DELETE an article without authorization', (done) => {
        let id = "61e4014690b12add9ba7b332"
        chai.request(server)
            .delete('/api/v1/articles/' + id)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized');
                done();
            });
    });
});


