'use strict';

const fs = require('fs');

fs.writeFile('target.txt', 'Testing write file...', function (err) {
  if (err) {
    throw err;
  }

  console.log('File saved!');
});