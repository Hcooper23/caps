'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');

function simulatePickup(storeName) {
  const payload = generateOrderPayload(storeName);
  eventPool.emit('pickup', payload);
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload,
  });
}

function generateOrderPayload(storeName) {
  const chance = new Chance();
  const orderId = chance.guid();
  const customer = chance.name();
  const address = chance.address();
  const timestamp = chance.timestamp();

  return {
    store: storeName,
    orderId,
    customer,
    address,
    timestamp,
  };
}

function processEventData(event) {
  if (event.event === 'pickup') {
    const { orderId, customer, address } = event.payload;
    return {
      orderId,
      customer,
      address,
      status: 'picked up',
    };
  } else if (event.event === 'in-transit') {
    const { orderId } = event.payload;
    return {
      orderId,
      status: 'in transit',
    };
  } else if (event.event === 'delivered') {
    const { orderId } = event.payload;
    return {
      orderId,
      status: 'delivered',
    };
  }
}

module.exports = {
  start: function () {
    const storeName = '1-206-flowers';
    setInterval(() => {
      simulatePickup(storeName);
    }, 5000);
  },
  processEventData: processEventData, 
};
