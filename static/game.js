var socket = io();

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'a':
    case 'A':
      movement.left = true
      break
    case 'w':
    case 'W':
      movement.up = true
      break
    case 'd':
    case 'D':
      movement.right = true
      break
    case 's':
    case 'S':
      movement.down = true
      break
  }
})

document.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'a':
    case 'A':
      movement.left = false
      break
    case 'w':
    case 'W':
      movement.up = false
      break
    case 'd':
    case 'D':
      movement.right = false
      break
    case 's':
    case 'S':
      movement.down = false
      break
  }
})

socket.emit('new player')
setInterval(() => {
  socket.emit('movement', movement)
}, 1000 / 60)

var canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 600
var context = canvas.getContext('2d')
var allPlayers = []
socket.on('state', (players) => {
  allPlayers = players
  context.clearRect(0, 0, 800, 600)
  context.fillStyle = 'green'
  for(var id in players) {
    var player = players[id]
    context.beginPath()
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI)
    context.fill()
  }
})