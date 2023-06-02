const { expect } = require('chai');
const { Server } = require('socket.io');
const { pickupPackage, deliverPackage } = require('../../clients/driver/handler');
const { emitPickupEvent, deliveredHandler } = require('../../clients/driver/index');

// Mock socket.io server
const server = new Server();
const port = 3001;
server.listen(port);

describe('Driver Handler', () => {
  it('should emit "in-transit" event when pickupPackage is called', (done) => {
    const payload = { orderID: '12345' };

    server.on('connection', (socket) => {
      socket.on('in-transit', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    pickupPackage(payload);
  });

  it('should emit "delivered" event when deliverPackage is called', (done) => {
    const payload = { orderID: '12345' };

    server.on('connection', (socket) => {
      socket.on('delivered', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    deliverPackage(payload);
  });
});

describe('Driver Index', () => {
  it('should emit "received" and "in-transit" events with proper payloads', (done) => {
    const payload = { orderID: '12345' };

    server.on('connection', (socket) => {
      socket.on('received', (data) => {
        expect(data).to.deep.equal({ queueId: 'DRIVER' });
        socket.emit('in-transit', payload);
      });

      socket.on('in-transit', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    emitPickupEvent(payload);
  });

  it('should emit "delivered" event with proper payload', (done) => {
    const payload = { orderID: '12345' };

    server.on('connection', (socket) => {
      socket.on('delivered', (data) => {
        expect(data).to.deep.equal(payload);
        done();
      });
    });

    deliveredHandler(payload);
  });
});
