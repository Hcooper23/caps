'use strict';

const socket = require('../socket');

// Connect to the CAPS Application Server using socket.io-client
socket.connect('/caps');

// Use the store name 1-206-flowers to simulate a single vendor
const vendorId = '1-206-flowers';
const room = `vendor-${vendorId}`;
socket.emit('join', room);

// Upon connection, simulate new customer orders
setInterval(() => {
  const orderId = Math.floor(Math.random() * 1000);
  const customerName = `Customer${orderId}`;
  const address = `Address${orderId}`;
  const payload = { vendorId, orderId, customerName, address };
  socket.emit('pickup', payload);
}, 5000);

// Listen for the 'delivered' event from the CAPS server
socket.on('delivered', payload => {
  console.log(`Thank you for your order ${payload.customerName}`);
});

const Chance = require('chance');
const chance = new Chance();

function generateOrderPayload(storeName) {
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

function simulatePickup(storeName) {
  const payload = generateOrderPayload(storeName);
  socket.emit('pickup', payload);
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload,
  });
}

function start() {
  const storeName = '1-206-flowers';
  setInterval(() => {
    simulatePickup(storeName);
  }, 5000);
}

socket.on('pickup', payload => {
  const eventData = processEventData({ event: 'pickup', payload });
  console.log('Processed Event:', eventData);
});

start();
