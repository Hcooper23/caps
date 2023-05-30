'use strict';
const handler = require('./handler');
const eventPool = require('../eventPool');

eventPool.on('delivered', payload => {
  console.log('EVENT:', {
    event: 'delivered',
    time: new Date().toISOString(),
    payload,
  });
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});

eventPool.on('pickup', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload,
  });
  handler.pickupPackage(payload);
});

eventPool.on('in-transit', payload => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: new Date().toISOString(),
    payload,
  });
  handler.deliverPackage(payload);
});

function start() {
  // Start the driver module
  console.log('DRIVER: Driver module started');
}

module.exports = {
  start: start,
  processEventData: handler.processEventData, // Export the processEventData function from the handler
};
