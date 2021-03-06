const http = require('http')
const app = require('../server/ExpressApp').initialize()

const server = http.createServer(app)

const websocket = require('ws')

const wss = new websocket.Server({server})

wss.on('connection', ws => {
    //connection is up, let's add a simple simple event
    ws.on('message', message => {

        //log the received message and send it back to the client
        console.log('received: %s', message)

        const serverRegexp = /^server:/

        if (serverRegexp.test(message)) {
            message = message.replace(serverRegexp, '')
            ws.send(`Hello, you sent -> ${message}`)
        }
        else {
            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client !== ws) {
                        client.send(`Hello, broadcast message -> ${message}`)
                    }
                })
            ws.send(`Hello, you sent -> ${message}`)
        }
    })

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server')
})

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`)
})