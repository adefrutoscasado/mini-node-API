let should = require('chai').should()
let apiClient = require('./../build/api/apiClient')

describe('Api Client tests', () => {
  describe('getUser Endpoint', () => {
    it('Should return data', async () => {
      let data = await apiClient.getUser(1)
      data.should.be.a('object')
      data.should.have.property('id')
      data.should.have.property('avatar')
    })
  })
  describe('getImage Endpoint', () => {
    it('Should return data', async () => {
      let data = await apiClient.getFile('https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg')
      data.should.be.instanceof(Buffer)
    })
  })
  describe('getPage Endpoint', () => {
    it('Should return data', async () => {
      let data = await apiClient.getPage(1)
      data.should.be.a('object')
      data.should.have.property('total_pages')
      data.should.have.property('page')
      data.should.have.property('data')
    })
  })
})