const merge = require('webpack-merge');
const base = require('./base.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./coverage'),
    filename: 'objectarray.js'
  },

  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['coverage'], {root: path.resolve('./')})
  ]
});
