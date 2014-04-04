const fs = require('fs');

// argv stands for Argument Vector, it’s an array containing node and the full path to the watcher-argv.js as its first two elements.
// The third element (that is, at index 2) is target.txt, the name of our target file.
const filename = process.argv[2];

if (!filename) {
  throw Error('A file to watch must be specified.');
}

fs.watch(filename, function () {
  console.log('File ' + filename + ' just changed.');
});

console.log('Waiting for changes')