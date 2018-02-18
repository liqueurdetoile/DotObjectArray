const merge = require('webpack-merge');
const path = require('path');
const base = require('./base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
  devtool: 'source-map',
  output: {
    path: path.resolve('./dev'),
    filename: 'objectarray.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dev'], {root: path.resolve('./')}),
    new BundleAnalyzerPlugin(),
  ]
});