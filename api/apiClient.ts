const axios = require('axios')

const API_HOST = 'https://reqres.in/api'


exports.getUser = async (userId: number) => {
  let response = await axios.get(`${API_HOST}/users/${userId}`)
  return response.data.data
}

// returns arrayBuffer
exports.getFile = async (url: string) => {
  let response = await axios.get(url, {
    responseType: 'arraybuffer'
  })
  return response.data
}

exports.getPage = async (pageNumber: number) => {
  let response = await axios.get(`${API_HOST}/users?page=${pageNumber}`)
  return response.data
}
