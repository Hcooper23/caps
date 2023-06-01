'use strict';
const { Server } = require('socket.io');

const io = new Server();

const capsNamespace = io.of('/caps');

capsNamespace.on('connection', socket => {
  console.log('New connection:', socket.id);
  socket.on('join', room => {
    console.log('Socket joined room:', socket.id, room);
    socket.join(room);
  });

  socket.on('pickup', payload => {
    const timestamp = new Date().toISOString();
    console.log('Event:', { event: 'pickup', payload, timestamp });
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    const timestamp = new Date().toISOString();
    console.log('Event:', { event: 'in-transit', payload, timestamp });
    capsNamespace.to(`vendor-${payload.store}`).emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    const timestamp = new Date().toISOString();
    console.log('Event:', { event: 'delivered', payload, timestamp });
    capsNamespace.to(`vendor-${payload.store}`).emit('delivered', payload);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const port = 3000;
console.log(`Server is listening on port ${port}`);
io.listen(port);