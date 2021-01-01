var socket = io();
socket.on('message', (data) => {
  console.log(data)
})

var messageCount = 0
setInterval(() => {
  messageCount++
  socket.emit('message', `Message ${messageCount}: yo, server`)
}, 1000)
