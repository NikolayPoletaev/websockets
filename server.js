    const WebSocketLibrary = require('ws')

    const server = new WebSocketLibrary.Server ({ port: 3000 })

    server.on('connection', connection => {
        connection.on('message',message => {


            if (message.toString() === 'exit')
            connection.close()


            server.clients.forEach((client) => {
                client.send(message.toString())
            })
        })
        connection.send('Привет от сервера Websocket')
    })