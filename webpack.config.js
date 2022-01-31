var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(/wordly/),
    filename: '_bundle.js'
  }
};
