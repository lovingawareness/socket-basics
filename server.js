/**
 * Following:
 * https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b
 * 
 */
const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const PORT = 5000

const app = express()
server = http.Server(app)
io = socketIO(server)

app.set('port', PORT)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})

var players = {}
io.on('connection', (socket) => {
  socket.on('new player', () => {
    console.log(`New player joined: ${socket.id}`)
    players[socket.id] = {
      x: 300,
      y: 300
    }
  })
  socket.on('movement', (movement) => {
    var player = players[socket.id] || {}
    if(movement.left) {
      player.x -= 5
    }
    if(movement.right) {
      player.x += 5
    }
    if(movement.up) {
      player.y -= 5
    }
    if(movement.down) {
      player.y += 5
    }
  })
})

setInterval(() => {
  io.sockets.emit('state', players)
}, 1000 / 60)