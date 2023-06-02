'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: '1-800-flowers',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  socket.emit('JOIN', payload.store);
  console.log(`VENDOR: Order #:${payload.orderID} ready for pickup.`);
  socket.emit('pickup', payload);
};

const packageDelivered = (payload) => {
  console.log(`VENDOR: Thank you for your order ${payload.customer}`);
};

module.exports = { createOrder, packageDelivered };
