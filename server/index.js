'use strict';

const { Server } = require('socket.io');
const server = new Server();
const caps = server.of('/caps');

const Queue = require('./lib/queue');
let eventQueue = new Queue();

function logger(event, payload) {
  const timestamp = new Date().toISOString();
  console.log('Event:', { event, payload, timestamp });
}

caps.on('connection', socket => {
  console.log('New connection:', socket.id);

  socket.on('JOIN', room => {
    console.log('Socket joined room:', socket.id, room);
    socket.join(room);
  });

  socket.on('pickup', payload => {
    let currentQueue = eventQueue.read('DRIVER');
    if (!currentQueue) {
      let queueKey = eventQueue.store('DRIVER', new Queue());
      currentQueue = eventQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);

    logger('pickup', payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    setTimeout(() => {
      console.log('Hello');
      logger('in-transit', payload);
      caps.emit('delivered', payload);
      caps.to(`vendor-${payload.store}`).emit('delivered', payload);
    }, 1000); 
  });

  socket.on('delivered', payload => {
    setTimeout(() => {
      console.log('HUYGUYDCGHW');
      logger('delivered', payload);
      socket.to(payload.store).emit('delivered', payload);
    }, 2000); 
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
