'use strict';

const eventPool = require('./eventPool');
const vendor = require('./vendor');
const driver = require('./driver');

// Logging all events in the event pool
eventPool.on('event', (event, payload) => {
  const timestamp = new Date().toISOString();
  console.log(`EVENT { event: '${event}', time: ${timestamp}, payload: ${JSON.stringify(payload)} }`);
});

// Start the vendor and driver modules
vendor.start();
driver.start();
