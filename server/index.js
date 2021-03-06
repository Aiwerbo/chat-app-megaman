const express = require('express');
const { v4: uuidv4 } = require('uuid');
const port = 3010;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
 
  socket.on('message', (message) => {
    console.log(message)
    const id = uuidv4()
    const date = new Date()

    const newMessage = {...message, id, date}

    io.sockets.emit('new_message', (newMessage))
  })

  console.log('New User connected')

});
server.listen(port, () => console.log(`App listening on port ${port}!`));