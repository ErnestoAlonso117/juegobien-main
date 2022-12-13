const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const pptlspdwoGame = require('./pptlspdwo');

const puerto = process.env.PORT || 8080;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Sever static from ${clientPath}`);

app.use(express.static(clientPath));


const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {
    if (waitingPlayer) {
        new pptlspdwoGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Esperando por un Contrincante');
    }
    sock.emit('message', 'Hola, se ha conectado')
    sock.on('message', (text) => {
        io.emit('message', text);
    })
});

server.on('error', (err) => {
    console.error('server error: ', err);
});

server.listen(puerto, () => {
    console.log('server conectado en ' + puerto);
});