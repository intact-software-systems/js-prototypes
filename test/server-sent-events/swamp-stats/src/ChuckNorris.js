import React, {useState} from 'react'
import {ComputeLoans} from './cache/ComputeLoans'
import axios from 'axios'

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

        {
            jokes.map((joke, index) => {
                return <div key={index}>
                    <br/>
                    {index + ': ' + joke}
                </div>
            })
        }
    </div>
}