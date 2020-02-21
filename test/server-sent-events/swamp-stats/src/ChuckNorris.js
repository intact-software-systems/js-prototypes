import React, {Suspense, useState} from 'react'

const {ComputeLoans} = require('./cache/ComputeLoans')

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


export default function ChuckNorris() {
    const [loans] = useState(new ComputeLoans())
    const [jokes, setJokes] = useState([])

    // useEffect(() => {
    //     loans.computeIfAbsent('joke', () => axios.get('https://api.chucknorris.io/jokes/random'))
    //         .then(result => {
    //             console.log(JSON.stringify(result.data))
    //             setJokes(jokes => jokes.concat(result.data))
    //         })
    // }, [loans, jokes])


    return <div>
        <button onClick={() => {
            loans
                .computeIfAbsent(jokes.length, () => axios.get('https://api.chucknorris.io/jokes/random'))
                .then(result => setJokes(jokes => jokes.concat(result.data.value)))
        }}>
            Fetch Joke
        </button>

        <Suspense fallback={<h1>Loading jokes...</h1>}>
            {
                jokes.map((joke, index) => {
                    return <div key={index}>
                        <br/>
                        {index + ': ' + joke}
                    </div>
                })
            }
        </Suspense>
    </div>
}