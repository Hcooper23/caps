'use strict';
const handler = require('./handlerr');
const eventPool = require('../eventPool');

describe('Vendor Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should emit pickup event with correct payload', () => {
    const emitSpy = jest.spyOn(eventPool, 'emit');

    const store = 'Test Store';
    handler.emitPickupEvent(store);

    expect(emitSpy).toHaveBeenCalledWith('pickup', expect.any(Object));
  });
});