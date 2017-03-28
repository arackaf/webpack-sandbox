var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    },
    resolve: {
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015-webpack', 'stage-1', 'stage-2'],
                    plugins: ['transform-decorators-legacy', 'external-helpers']
                }
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            async: 'book-modal-helpers',
            minChunks(module, count) {
                var context = module.context;
                var targets = ['react-autosuggest', 'react-autowhatever']
                return context && 
                        (context.indexOf('node_modules') >= 0 && targets.find(t => new RegExp('\\\\' + t + '\\\\', 'i').test(context)));
            },
        })
    ]
};