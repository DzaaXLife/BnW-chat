const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const getPort = require('get-port');
const crypto = require('crypto');

const app = express();
app.use(express.static('public'));

const roomKeys = {};
const roomUsers = {}; // simpan username per room

(async () => {
  const PORT = await getPort({ port: getPort.makeRange(3000, 3100) });
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    let currentRoom = null;
    let username = null;

    socket.on('join-room', (room, name) => {
      username = name;
      currentRoom = room;
      socket.join(room);

      // generate key jika belum ada
      if(!roomKeys[room]) roomKeys[room] = crypto.randomBytes(32);
      if(!roomUsers[room]) roomUsers[room] = [];

      roomUsers[room].push(username);

      // kirim key ke client
      socket.emit('room-key', Array.from(roomKeys[room]));

      // kirim update user list ke semua client di room
      io.to(room).emit('room-users', roomUsers[room]);
    });

    socket.on('encrypted-message', ({ room, data }) => {
      socket.to(room).emit('encrypted-message', data);
    });

    socket.on('leave-room', () => {
      if(currentRoom && username && roomUsers[currentRoom]){
        roomUsers[currentRoom] = roomUsers[currentRoom].filter(u=>u!==username);
        socket.leave(currentRoom);
        io.to(currentRoom).emit('room-users', roomUsers[currentRoom]);
      }
    });

    socket.on('disconnect', () => {
      if(currentRoom && username && roomUsers[currentRoom]){
        roomUsers[currentRoom] = roomUsers[currentRoom].filter(u=>u!==username);
        io.to(currentRoom).emit('room-users', roomUsers[currentRoom]);
      }
    });
  });

  server.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));
})();