var socket = io();
socket.on('message', (data) => {
  console.log(`Server: ${data}`)
})

socket.on('knockknock', (data) => {
  console.log(`Server: ${data}`)
  var response = "Who's there?"
  console.log(`Client: ${response}`)
  socket.emit('whosthere', response)
})

socket.on('whosthere', (data) => {
  console.log(`Server: ${data}`)
  var response = `${data} who?`
  console.log(`Client: ${response}`)
  socket.emit('who', response)
})

socket.on('answer', (data) => {
  console.log(`Server: ${data}`)
  var response = 'hahahahaha'
  console.log(`Client: ${response}`)
  socket.emit('laughter', response)
})