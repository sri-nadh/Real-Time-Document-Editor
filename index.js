const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('text-changed', (text) => {
    socket.broadcast.emit('text-changed', text);
  });
});

server.listen(port,'0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
