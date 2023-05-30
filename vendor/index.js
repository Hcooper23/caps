'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');

// Simulate a pickup event for the given store name
function simulatePickup(storeName) {
  const payload = generateOrderPayload(storeName);
  eventPool.emit('pickup', payload);
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload,
  });
}

// Generate a random order payload using chance library
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

// Function to process the event data and retrieve the desired information
function processEventData(event) {
  if (event.event === 'pickup') {
    // Process the pickup event
    const { orderId, customer, address } = event.payload;
    // Return the desired data
    return {
      orderId,
      customer,
      address,
      status: 'picked up',
    };
  } else if (event.event === 'in-transit') {
    // Process the in-transit event
    const { orderId } = event.payload;
    // Return the desired data
    return {
      orderId,
      status: 'in transit',
    };
  } else if (event.event === 'delivered') {
    // Process the delivered event
    const { orderId } = event.payload;
    // Return the desired data
    return {
      orderId,
      status: 'delivered',
    };
  }
}

module.exports = {
  start: function () {
    // Start the vendor client application
    const storeName = '1-206-flowers';
    setInterval(() => {
      simulatePickup(storeName);
    }, 5000);
  },
  processEventData: processEventData, // Export the processEventData function
};
