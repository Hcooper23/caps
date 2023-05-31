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
    console.log(`DRIVER: picked up ${payload.orderId}`);
    eventPool.emit('in-transit', payload);
  },
  deliverPackage: payload => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    eventPool.emit('delivered', payload);
  },
};