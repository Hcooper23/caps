'use strict';
const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

eventPool.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});

module.exports = {
  emitPickupEvent(store) {
    const payload = {
      store,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.city() + ', ' + chance.state(),
    };
    eventPool.emit('pickup', payload);
  },
  deliveredHandler(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  },
};