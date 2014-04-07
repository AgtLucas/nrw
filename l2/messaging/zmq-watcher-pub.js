'use strict';

const fs = require('fs');
const zmq = require('zmq');

// Create publisher endpoint
const publisher = zmq.socket('pub');

const filename = process.argv[2];

fs.watch(filename, function () {

  // Send message to any subscribers
  publisher.send(JSON.stringify({
    type: 'changed',
    file: filename,
    timestamp: Date.now()
  }));

});