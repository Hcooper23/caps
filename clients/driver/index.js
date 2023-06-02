'use strict';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

socket.emit('getAll', { queueId: 'DRIVER' });

const pickupPackage = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('received', { queueId: 'DRIVER' });
    socket.emit('in-transit', payload);
  }, 1000);
};

const deliverPackage = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`);
    socket.emit('delivered', payload);
  }, 1000);
};

socket.on('pickup', pickupPackage);
socket.on('in-transit', deliverPackage);

module.exports = {
  pickupPackage,
  deliverPackage,
};



