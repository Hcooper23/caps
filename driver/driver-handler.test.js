'use strict';
const handler = require('./handler');
const eventPool = require('../eventPooll');

describe('Driver Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log "DRIVER: picked up <ORDER_ID>" on pickup event', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const payload = {
      store: 'Test Store',
      orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
      customer: 'Jamal Braun',
      address: 'Schmittfort, LA',
    };

    eventPool.emit('pickup', payload);

    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`);
  });

  it('should log "DRIVER: delivered <ORDER_ID>" on in-transit event', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const payload = {
      store: 'Test Store',
      orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
      customer: 'Jamal Braun',
      address: 'Schmittfort, LA',
    };

    eventPool.emit('in-transit', payload);

    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered ${payload.orderId}`);
  });
});