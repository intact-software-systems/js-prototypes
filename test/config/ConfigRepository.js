
const nodeEnv = process.env.NODE_ENV

function createAxiosInstance() {
    const axios = require('axios')

    switch (nodeEnv) {
        case 'production': {
            break
        }
        case 'test':
        case 'development':
        default: {
            const axiosInstance = axios.create({
                transformResponse: [
                    function (data) {
                        // console.log(data)
                        return data
                    },
                    ...axios.defaults.transformResponse],
                transformRequest: [
                    function (data, headers) {
                        // if (data) {
                        //     console.log(data + ' ' + JSON.stringify(headers))
                        // }
                        // else {
                        //     console.log(JSON.stringify(headers))
                        // }

                        return data
                    },
                    ...axios.defaults.transformRequest]
                // adapter: (config) => {
                //     console.log(config.method + ' ' + config.url + ' ' + config.data + ' ' + JSON.stringify(config.headers))
                //     return Promise.resolve(config)
                // }
            })

            axiosInstance.interceptors.request
                .use(config => {
                    console.log('REQUEST: ' + config.method.toUpperCase() + ' ' + config.url + ' ' + config.data + ' ' + JSON.stringify(config.headers))
                    return config
                })

            axiosInstance.interceptors.response
                .use(config => {
                    console.log('RESPONSE: ' + config.config.method.toUpperCase() + ' ' + config.config.url + ' ' + config.status + ' ' + config.statusText + ' ' + JSON.stringify(config.headers) + ' ' + JSON.stringify(config.data ? config.data : ''))
                    return config
                }, error => {
                    console.error('RESPONSE ERROR: ' + error.config.method.toUpperCase() + ' ' + error.config.url + ' ' + error.response.status + ' ' + error.response.statusText + ' ' + JSON.stringify(error.config.headers) + ' ' + JSON.stringify(error.config.data ? error.config.data : ''))
                    return Promise.reject(error)
                })

            return axiosInstance
        }
    }
}

module.exports = {
    axiosInstance: createAxiosInstance()
}