var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    shop: './app/scripts/shop/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ]
};
