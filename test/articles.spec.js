import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { assert } from 'chai';
import { 
    getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    patchArticleHandler,
    deleteArticleHandler 
    } from '../src/controllers/articleController.js'

chai.use(chaiHttp);

describe('Get Articles', () => {
    it('it should display all the articles', (done) => {
        getArticlesHandler().then(result => {
            expect(result).to.be.a('array');
            expect(result).to.have.status(200);
            done();
        })
    });
});

describe('Get Specific Article', () => {
    it('it should the requested article', (done) => {
        getSpecificArticleHandler().then(result => {
            expect(result).to.be.a('object');
            expect(result).to.have.status(200);
            done();
        })
    });
});

