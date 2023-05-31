'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');

describe('Vendor event handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('delivered event handler should log the thank you message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const payload = {
      orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    };

    handler.deliveredHandler(payload);

    expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${payload.orderId}`);
  });
});

