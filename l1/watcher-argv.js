const fs = require('fs');
const filename = proccess.argv[2];

if (!filename) {
  throw Error('A file to watch must be specified.');
}

fs.watch(filename, function () {
  console.log('File ' + filename + ' just changed.');
});

console.log('Waiting for changes')