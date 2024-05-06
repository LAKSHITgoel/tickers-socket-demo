import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(http);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on port 8080');
})

