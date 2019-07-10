const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('find company',()=>{
//   it('should find company by name',()=>{
//       chai.request(app).get('/findCompany/byName')
//         .end((err,res)=>{
           
//             res.should.have.status(200);
//             done();
//         })
//   })

describe('byNumber',()=>{
    it('should find company by number',(done)=>{
        chai.request(app).get('/findCompany/byNumber/510003')
          .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('array');
             done();
          })
    })

    it('should reutn 404 not found',(done)=>{
        chai.request(app).get('/findCompany/byNumber/11111111')
          .end((err,res)=>{
              res.should.have.status(404);
             
             done();
          })
    })
})
  
})