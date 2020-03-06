const axios = require('axios')
axios.interceptors.request
    .use(config => {
        console.log('REQUEST: ' + config.method.toUpperCase() + ' ' + config.url + ' ' + JSON.stringify(config.data ? config.data : '') + ' ' + JSON.stringify(config.headers))
        return config
    }, error => {
        console.error('REQUEST ERROR: ' + error.config.method.toUpperCase() + ' ' + error.config.url + ' ' + error.request.status + ' ' + error.request.statusText + ' ' + JSON.stringify(error.config.headers) + ' ' + JSON.stringify(error.config.data ? error.config.data : ''))
        return Promise.reject(error.response)
    })

axios.interceptors.response
    .use(config => {
        console.log('RESPONSE: ' + config.config.method.toUpperCase() + ' ' + config.config.url + ' ' + config.status + ' ' + config.statusText + ' ' + JSON.stringify(config.data ? config.data : '') + ' ' + JSON.stringify(config.headers))
        return config
    }, error => {
        console.error('RESPONSE ERROR: ' + error.config.method.toUpperCase() + ' ' + error.config.url + ' ' + error.response.status + ' ' + error.response.statusText + ' ' + JSON.stringify(error.config.data ? error.config.data : '') + ' ' + JSON.stringify(error.config.headers))
        return Promise.reject(error.response)
    })

module.exports = axios