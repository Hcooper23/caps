'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const pickupPackage = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  socket.emit('in-transit', payload);
};

const deliverPackage = (payload) => {
  console.log(`DRIVER: delivered ${payload.orderID}`);
  socket.emit('delivered', payload);
};

socket.on('connect', () => {
  console.log('Driver socket connected to server: ', socket.id);
});

socket.on('pickup', pickupPackage);
socket.on('in-transit', deliverPackage);

module.exports = {
  pickupPackage,
  deliverPackage,
};

