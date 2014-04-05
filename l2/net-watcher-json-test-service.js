'use strict';

const net = require('net');

const server = net.createServer(function (connection) {
  console.log('Subscriber connected');

  // Send the first chunk immediately
  connection.write(
    '{"type":"changed","file":"targ'
  );

  // After a one second delay, send the other chunck
  let timer = setTimeout(function () {
    connection.write('et.txt","timestamp":1358175758495}' + "\n");
    connection.end();
  }, 1000);

  // Clear timer when the connection ends
  connection.on('end', function () {
    clearTimeout(timer);
    console.log('Subscriber disconnected');
  });

});

server.listen(5432, function () {
  console.log('Test server listening for subscribers...');
});