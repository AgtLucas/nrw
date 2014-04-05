'use strict';

const fs = require('fs');
const net = require('net');

const filename = process.argv[2];

const server = net.createServer(function (connection) {

  // Reporting
  console.log('Subscriber connected.');

  // JSON Messages
  connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }) + '\n');

  // Watcher setup
  let watcher = fs.watch(filename, function () {

    // JSON Messages
    connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    }) + '\n');

  });

  // Cleanup
  connection.on('close', function () {
    console.log('Subscriber disconnected.');
    watcher.close();
  });

});

if (!filename) {
  throw Error('No target filename was specified.');
}

server.listen(5342, function () {
  console.log('Listening for subrscribers...');
});