import React, {useEffect, useState} from 'react'

export default function EventStream() {
    const [nests, setNests] = useState([])
    const [listening, setListening] = useState(false)

    useEffect(() => {
        if (!listening) {
            const events = new EventSource('http://localhost:5000/events')
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data)

                console.log(event.data)

                setNests(nests => nests.concat(parsedData))
            }

            events.onerror = event => {
                console.log('error: ' + event.data)
            }

            setListening(true)
        }
    }, [listening])

    return <table className="stats-table">
        <thead>
        <tr>
            <th>Momma</th>
            <th>Eggs</th>
            <th>Temperature</th>
        </tr>
        </thead>
        <tbody>
        {
            nests.map((nest, i) =>
                <tr key={i}>
                    <td>{nest.momma}</td>
                    <td>{nest.eggs}</td>
                    <td>{nest.temperature} ℃</td>
                </tr>
            )
        }
        </tbody>
    </table>
}