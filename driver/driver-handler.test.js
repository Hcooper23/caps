'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');

describe('Driver event handlers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('pickup event handler should log the pickup message and emit in-transit event', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const emitSpy = jest.spyOn(eventPool, 'emit');
    const payload = {
      orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    };

    handler.pickupPackage(payload);

    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`);
    expect(emitSpy).toHaveBeenCalledWith('in-transit', payload);
  });

  test('in-transit event handler should log the delivered message and emit delivered event', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const emitSpy = jest.spyOn(eventPool, 'emit');
    const payload = {
      orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    };

    handler.deliverPackage(payload);

    expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: delivered ${payload.orderId}`);
    expect(emitSpy).toHaveBeenCalledWith('delivered', payload);
  });
});
