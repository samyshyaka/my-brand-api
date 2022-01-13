import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js'

chai.use(chaiHttp);
chai.should();

describe('Get Articles', () => {
    it('it should display all the articles', (done) => {
        chai.request(server)
            .get('/articles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array')
                res.body.length.should.be.eql(3);
                done();
            })
    })
})


