import chai from 'chai';
import chaiHttp from 'chai-http';

import Article from '../src/models/article.js'
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
    it('it should POST a article ', (done) => {
        let article = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
          chai.request(server)
          .post('/article')
          .send(article)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Article successfully added!');
                res.body.article.should.have.property('title');
                res.body.article.should.have.property('author');
                res.body.article.should.have.property('pages');
                res.body.article.should.have.property('year');
            done();
          });
    });
});
describe('/GET/:id article', () => {
    it('it should GET a article by the given id', (done) => {
        let article = new Article({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
        article.save((err, article) => {
            chai.request(server)
          .get('/article/' + article.id)
          .send(article)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('author');
                res.body.should.have.property('pages');
                res.body.should.have.property('year');
                res.body.should.have.property('_id').eql(article.id);
            done();
          });
        });

    });
});
describe('/PUT/:id article', () => {
    it('it should UPDATE a article given the id', (done) => {
        let article = new Article({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        article.save((err, article) => {
              chai.request(server)
              .put('/api/v1/articles' + article.id)
              .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Article updated!');
                    res.body.article.should.have.property('year').eql(1950);
                done();
              });
        });
    });
});
/*
* Test the /DELETE/:id route
*/
describe('/DELETE/:id article', () => {
    it('it should DELETE a article given the id', (done) => {
        let article = new Article({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        article.save((err, article) => {
              chai.request(server)
              .delete('/api/v1/articles/' + article.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Article successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});


