'use strict';

const fs = require('fs');
const net = require('net');

const filename = process.argv[2];

const server = net.createServer(function (connection) {

  // Reporting
  console.log('Subscriber connected.');
  connection.write("Now watching '" + filename + "' for changes...\n");

  // Watcher setup
  let watcher = fs.watch(filename, function () {
    connection.write("File '" + filename + "' changed: " + Date.now() + "\n");
  });

  // Cleanup
  connection.on('clise', function () {
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