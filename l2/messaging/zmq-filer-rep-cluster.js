'use strict';

const cluster = require('cluster');
const fs = require('fs');
const zmq = require('zmq');

if (cluster.isMaster) {

  // Master process - create ROUTER and DEALER sockets, bind endpoints
  let router = zmq.socket('router').bind('tcp://127.0.01:5433');
  let dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

  // Forward messages betweeen router and dealer
  router.on('message', function () {
    let frames = Array.prototype.slice.call(arguments);
    dealer.send(frames);
  });

  dealer.on('message', function () {
    let frames = Array.prototype.slice.call(null, arguments);
    router.send(frames);
  });

  // Lister for workers to come online
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online.');
  });

  // For three worker process
  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }

} else {

  // Worker process - create REP socket, connect to DEALER
  let responder = zmq.socket('rep').connect('ipc://filter-dealer.ipc');

  responder.on('message', function (data) {

    // Parse incoming message
    let request = JSON.parse(data);
    console.log(process.id +  ' received request for: ' + request.path);

    // Read file and reply with content
    fs.readFile(request.path, function (err, data) {
      console.log(process.pid + ' sending response...');
      responder.send(JSON.stringify({
        pid: process.pid,
        data: data.toString(),
        timestamp: Date.now()
      }));
    });

  });

}