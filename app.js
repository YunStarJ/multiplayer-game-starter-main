const express = require('express')
const app = express()

// socket.io setup
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const players = {}

io.on('connection', (socket) => {
  console.log('a user connected')
  players[socket.id] = {
    x: 100,
    y: 100
  }

  io.emit('updatePlayers', players)

  console.log(players)
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('server did load')