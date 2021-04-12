const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);


//////////////////////////////////////////Test case -1///////////////////////////////////////////////

describe('/ home route', () => {
  it('it should check the home page', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

//////////////////////////////////////////Test case-2//////////////////////////////////////////////////

describe('/ adoption route', () => {
    it('it should check the adoption page', (done) => {
      chai.request(server)
          .get('/adoption')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });


  ////////////////////////////////////////Test case-3//////////////////////////////////////////////////

  describe('/ child-labour route', () => {
    it('it should check the child labour page', (done) => {
      chai.request(server)
          .get('/child_labour')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });

  ////////////////////////////////////////Test case-4////////////////////////////////////////////////////

  describe('/ donation route', () => {
    it('it should check the donation page', (done) => {
      chai.request(server)
          .get('/donation')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });