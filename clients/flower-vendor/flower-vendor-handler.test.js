const { expect } = require('chai');
const { Server } = require('socket.io');
const { createOrder, packageDelivered } = require('../../clients/flower-vendor/handler');
const { emitDeliveredEvent, emitReceivedEvent } = require('../../clients/flower-vendor/index');

// Mock socket.io server
const server = new Server();
const port = 3001;
server.listen(port);

describe('Flower Vendor Handler', () => {
  it('should emit "JOIN" event with store ID and "pickup" event with proper payload', (done) => {
    const payload = {
      store: '1-800-flowers',
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

describe('Flower Vendor Index', () => {
  it('should emit "packageDelivered" event and "received" event with proper payload', (done) => {
    const payload = {
      store: '1-800-flowers',
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
