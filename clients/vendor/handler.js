'use strict';

const Chance = require('chance');
const chance = new Chance();
// const { io } = require('socket.io-client');

// const socket = io('http://localhost:3001/caps');

// const orderHandler = (payload = null) => {
//   if (!payload) {
//     payload = {
//       store: chance.company(),
//       orderId: chance.guid(),
//       customer: chance.name(),
//       address: chance.address(),
//     };
//   }

//   socket.emit('pickup', payload);
// };

const deliveredHandler = (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
};

// socket.on('delivered', deliveredHandler);
// socket.connect('/caps');

// const vendorId = '1-206-flowers';
// const room = `vendor-${vendorId}`;
// socket.emit('', room);

function emitPickupEvent(store, socket) {
  const payload = {
    store: store,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.city() + ', ' + chance.state(),
  };
  console.log('Payload', payload);
  socket.emit('pickup', payload);
}

// setInterval(() => {
//   emitPickupEvent(vendorId);
// }, 5000);

module.exports = {
  emitPickupEvent,
  deliveredHandler,
};
