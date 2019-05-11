let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('./../build/app')
let should = chai.should()

chai.use(chaiHttp)

describe('/GET user', () => {
  it('Should return OK', (done) => {
    chai.request(server)
      .get('/api/user/1')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})

describe('/GET unexisting user', () => {
  it('Should return 404 User Not Found', (done) => {
    chai.request(server)
      .get('/api/user/0')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })
})

describe('/GET user/1/avatar', () => {
  it('Should return OK', (done) => {
    chai.request(server)
      .get('/api/user/1/avatar')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})

describe('/DELETE user/1/avatar', () => {
  it('Should return OK', (done) => {
    chai.request(server)
      .delete('/api/user/1/avatar')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
