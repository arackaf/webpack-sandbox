var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './app.js'
    },
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    }
};