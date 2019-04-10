const path = require('path');
const merge = require('webpack-merge');
const base = require('./base.js');

module.exports = merge(base, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve('./dist'),
    filename: 'objectarray.min.js'
  }
});
