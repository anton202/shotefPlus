const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('find company', () => {
    it('should find company by name', (done) => {
        chai.request(app).get('/findCompany/byName/' + encodeURIComponent('שלג הנדסה'))
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    it('should return 404 if company name dose not exist', (done) => {
        chai.request(app).get('/cefindCompany/byName/' + encodeURIComponent('שכלךמדחעמקחנעקםנעמןקמה'))
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })

    describe('byNumber', () => {
        it('should find company by number', (done) => {
            chai.request(app).get('/findCompany/byNumber/510003')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        it('should reuturn 404 not found', (done) => {
            chai.request(app).get('/findCompany/byNumber/11111111')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })

})