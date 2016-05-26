var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssmqpacker = require('css-mqpacker');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Purify = require("purifycss-webpack-plugin");
var devEnv = require('../config/dev-environment');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app/init.js',
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
        ],
    },
    output: {
        path: path.join(__dirname, '../public/bundle'),
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/bundle/',
        jsonpFunction: 'vInit',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-react-remove-prop-types'],
                },
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?indentedSyntax=sass') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
        ],
    },
    postcss: [autoprefixer({ browsers: ['last 2 version'] }), cssmqpacker],
    plugins: [
        new ExtractTextPlugin('[name]-[chunkhash].css'),
        new Purify({
            basePath: __dirname,
            purifyOptions: {
                minify: true,
                info: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                GA_TRACKING_ID: JSON.stringify(devEnv.GA_TRACKING_ID),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash].js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
            comments: false,
        }),
        new AssetsPlugin({
            filename: 'webpack-stats.json',
            path: path.join(__dirname, '..', 'app', 'bundles'),
        }),
    ],
};
