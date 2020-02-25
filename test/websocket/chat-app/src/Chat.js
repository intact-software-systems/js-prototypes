import React, {useState} from 'react'
import Input from './Input'

export default function Chat(props) {
    const [chats, setChats] = useState([])
    const [websocket] = useState(() => {
        const ws = new WebSocket('ws://localhost:8999/ws')

        ws.onopen = () => {
            console.log('connected')
        }

        ws.onmessage = (event) => {
            // const parsedData = JSON.parse(event.data)
            console.log(event.data)
            setChats(chats => chats.concat(event.data))
        }

        ws.onerror = event => {
            console.log('error: ' + event.data)
        }

        ws.onclose = () => {
            console.log('disconnected')
        }
        return ws
    })


    return <table className="stats-table">
        <thead>
        <tr>
            <th>Message</th>
        </tr>
        </thead>
        <tbody>
        {
            chats.map((chat, i) =>
                <tr key={i}>
                    <td>{chat}</td>
                </tr>
            )
        }
        </tbody>

        <Input onMessage={message => websocket.send(message)}/>
    </table>
}