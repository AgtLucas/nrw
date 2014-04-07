'use strict';

const zmq = require('zmq');
const filename = process.argv[2];

// Create request endpoint
const requester = zmq.socket('req');

// Handle replies from responder
requester.on('message', function (data) {
  let response = JSON.parse(data);
  console.log('Received response:', response);
});

requester.connect('tcp://localhost:5433');
// Send request for content
for (let i = 1; i <= 3; i++) {
  console.log('Sending request ' + i + ' for ' + filename);
  requester.send(JSON.stringify({
    path: filename
  }));
}