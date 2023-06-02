'use strict';

const { emitPickupEvent, deliveredHandler } = require('./handler');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.on('delivered', deliveredHandler);

let store = '1-206-flowers';
socket.emit('JOIN', store);

setInterval(() => {
  emitPickupEvent(store, socket);
}, 5000);

