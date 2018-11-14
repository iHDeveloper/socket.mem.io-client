const SocketMemIOClient = require('./../index')
const client = new SocketMemIOClient.Client({
    https: false,
    host: "localhost",
    port: 2030
})

client.on('connect', () => {
    console.log('Connected!')
    client.emit('request')
})

client.on('response', () => {
    console.log('Recieved a response from the server')
    client.emit('heartbeat')
})

client.on('heartbeat', () => {
    console.log('Successfully test the socket.mem.io-client')
})

client.on('disconnect', () => {
    console.log('Disconnected! Re-connecting...')
})

console.log('Connecting...')