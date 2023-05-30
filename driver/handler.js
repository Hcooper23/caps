'use strict';
const eventPool = require('../eventPool');

eventPool.on('pickup', payload => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  eventPool.emit('in-transit', payload);
});

eventPool.on('in-transit', payload => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  eventPool.emit('delivered', payload);
});

module.exports = {
  pickupPackage: payload => {
    // Perform necessary actions for package pickup
    console.log(`DRIVER: picked up ${payload.orderId}`);
    eventPool.emit('in-transit', payload);
  },
  deliverPackage: payload => {
    // Perform necessary actions for package delivery
    console.log(`DRIVER: delivered ${payload.orderId}`);
    eventPool.emit('delivered', payload);
  },
};