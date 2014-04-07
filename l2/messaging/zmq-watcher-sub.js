'use strict';

const zmq = require('zmq');

// Create subscriber endpoint
const subscriber = zmq.socket('sub');

// Subscribe to all messages
subscriber.subscribe('');

subscriber.on('message', function (data) {
  let message = JSON.parse(data);
  let date = new Date(message.timestamp);
  console.log('File ' + message.file + ' changed at ' + date);
});

// Connect to publisher
subscriber.connect('tcp://localhost:5432');