const { expect } = require('chai');
const { Server } = require('socket.io');
const { createOrder, packageDelivered } = require('./handler');
const { emitDeliveredEvent, emitReceivedEvent } = require('./index');

// Mock socket.io server
const server = new Server();
const port = 3001;
server.listen(port);

describe('Widget Vendor Handler', () => {
  it('should emit "JOIN" event with store ID and "pickup" event with proper payload', (done) => {
    const payload = {
      store: 'acme-widgets',
      orderID: '12345',
      customer: 'John Doe',
      address: '123 Main St',
    };

    server.on('connection', (socket) => {
      socket.on('JOIN', (storeId) => {
        expect(storeId).to.equal(payload.store);
      });

      socket.on('pickup', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    createOrder(server, payload);
  });
});

describe('Widget Vendor Index', () => {
  it('should emit "packageDelivered" event and "received" event with proper payload', (done) => {
    const payload = {
      store: 'acme-widgets',
      orderID: '12345',
      customer: 'John Doe',
      address: '123 Main St',
    };

    server.on('connection', (socket) => {
      socket.on('delivered', (data) => {
        expect(data).to.deep.equal(payload);
      });

      socket.on('received', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    emitDeliveredEvent(server, payload);
  });
});
