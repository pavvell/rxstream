var path = require('path');

module.exports = {
  entry: [
    './tests/subjects/subject.js',
    './tests/operators/operators.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'tests/dist')
  },
  watchOptions: {
    ignored: /node_modules/
  }
};