'use strict';
const Chance = require('chance');
const chance = new Chance();
const socket = require('../socket.js');

socket.on('delivered', payload => {
  console.log(`Thank you for your order ${payload.customerName}`);
});

socket.connect('/caps');

const vendorId = '1-206-flowers';
const room = `vendor-${vendorId}`;
socket.emit('join', room);

function emitPickupEvent(store) {
  const payload = {
    store: store,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.city() + ', ' + chance.state(),
  };
  socket.emit('pickup', payload);
}

setInterval(() => {
  emitPickupEvent(vendorId);
}, 5000);

module.exports = {
  emitPickupEvent,
  deliveredHandler(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  },
};