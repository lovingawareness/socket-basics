var socket = io();

socket.emit('new player')

var app = new Vue({
  el: '#app',
  data: {
    reps: 8,
    workoutTime: 20,
    restTime: 10,
    currentRep: 1,
    currentTime: null,
    isWorkout: true
  }
})

socket.on('timerUpdate', (timeLeft) => {
  console.log('timerUpdate')
  app.currentTime = timeLeft
})