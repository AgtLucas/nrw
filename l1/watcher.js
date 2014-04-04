const fs = require('fs');

fs.watch('target.txt', function () {
  console.log('File changed...');
});

console.log('Waiting for changes...');