'use strict';
const socket = require('../socket');

const pickupPackage = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
};

const deliverPackage = (payload) => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', payload);
};

// socket.on('pickup', pickupPackage);
// socket.on('in-transit', deliverPackage);

module.exports = {
  pickupPackage,
  deliverPackage,
};