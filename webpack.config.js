var path = require('path');

module.exports = {
    entry: './app/scripts/shop/main.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loader: 'style!css!sass'
            },
            {
              test: /\.js?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            }
        ]
    },
    devtool: 'source-map'
};
