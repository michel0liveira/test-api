const axios = require('axios')
const api = axios.create({ 
    baseURL: 'http://sapi.smartcash.cc/v1/'
})

module.exports = api;
