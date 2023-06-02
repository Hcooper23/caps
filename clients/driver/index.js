'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const pickupPackage = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
};

const deliverPackage = (payload) => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', payload);
};

const handlePickupAndDeliver = (payload) => {
  setTimeout(() => {
    pickupPackage(payload);
  
  },1000);
  setTimeout(() => {
    deliverPackage(payload);
  },2000);
};

socket.on('pickup', handlePickupAndDeliver);
// socket.on('in-transit', deliverPackage);

module.exports = {
  pickupPackage,
  deliverPackage,
};

// Simulate behavior when receiving a 'pickup' event
// const samplePayload = {
//   orderId: '123',
//   customerName: 'John Doe',
//   address: '1234 Main St',
// };

// pickupPackage(samplePayload);

