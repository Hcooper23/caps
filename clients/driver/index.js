'use strict';

const handler = require('./handler');
const { EventEmitter } = require('events');
const socket = require('../socket');

const eventEmitter = new EventEmitter();

eventEmitter.on('pickup', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload,
  });
  handler.pickupPackage(payload);
});

eventEmitter.on('in-transit', payload => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: new Date().toISOString(),
    payload,
  });
  handler.deliverPackage(payload);
});

eventEmitter.on('delivered', payload => {
  console.log('EVENT:', {
    event: 'delivered',
    time: new Date().toISOString(),
    payload,
  });
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});

function start() {
  console.log('DRIVER: Driver module started');
}

// Connect to the CAPS Application Server using socket.io-client
socket.connect('/caps');

// Once connected, listen for the 'pickup' event from the Server
socket.on('pickup', handler.pickupPackage);

// Simulate behavior when receiving a 'pickup' event
handler.pickupPackage({
  orderId: '123',
  customerName: 'John Doe',
  address: '1234 Main St',
});

// Simulate behavior when receiving a 'delivered' event
socket.on('delivered', payload => {
  console.log(`Thank you for your order ${payload.customerName}`);
});

module.exports = {
  start: start,
  processEventData: handler.processEventData,
  emit: eventEmitter.emit.bind(eventEmitter),
  on: eventEmitter.on.bind(eventEmitter),
};  