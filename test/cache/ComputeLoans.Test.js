const {ComputeLoans} = require('../../src/cache/ComputeLoans')

const axios = require('axios')

axios.interceptors.request
    .use(config => {
        console.log('REQUEST: ' + config.method.toUpperCase() + ' ' + config.url + ' ' + config.data + ' ' + JSON.stringify(config.headers))
        return config
    })

axios.interceptors.response
    .use(config => {
        console.log('RESPONSE: ' + config.config.method.toUpperCase() + ' ' + config.config.url + ' ' + config.status + ' ' + config.statusText + ' ' + JSON.stringify(config.headers) + ' ' + JSON.stringify(config.data ? config.data : ''))
        return config
    }, error => {
        console.error('RESPONSE ERROR: ' + error.config.method.toUpperCase() + ' ' + error.config.url + ' ' + error.response.status + ' ' + error.response.statusText + ' ' + JSON.stringify(error.config.headers) + ' ' + JSON.stringify(error.config.data ? error.config.data : ''))
        return Promise.reject(error)
    })


const keyOne = '1'
const keyTwo = '2'
const keyThree = '3'

const loans = new ComputeLoans()
loans.computeIfAbsent(keyOne, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))
loans.computeIfAbsent(keyOne, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))
loans.computeIfAbsent(keyTwo, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))
loans.computeIfAbsent(keyTwo, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))
loans.computeIfAbsent(keyThree, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))
loans.computeIfAbsent(keyThree, () => axios.get('https://api.chucknorris.io/jokes/random')).then(result => console.log(JSON.stringify(result.data)))

console.log(loans.read(keyOne))



