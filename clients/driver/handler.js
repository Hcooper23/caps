'use strict';
const socket = require('../socket');

socket.on('pickup', payload => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
});

socket.on('in-transit', payload => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', payload);
});

module.exports = {
  pickupPackage(payload) {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('in-transit', payload);
  },
  deliverPackage(payload) {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
  },
};