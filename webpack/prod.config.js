var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssmqpacker = require('css-mqpacker');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app/init.js',
    },
    output: {
        path: path.join(__dirname, '../public/bundle'),
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/bundle/',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new AssetsPlugin({
            filename: 'webpack-stats.json',
            path: path.join(__dirname, '..', 'app', 'bundles'),
        }),
    ],
};
