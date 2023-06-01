'use strict';
const socketIOClient = require('socket.io-client');

const socket = socketIOClient('http://localhost:3000');

module.exports = socket;    