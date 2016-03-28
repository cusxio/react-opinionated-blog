import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import cssmqpacker from 'css-mqpacker';
import AssetsPlugin from 'assets-webpack-plugin';
import notifyStats from './utils/notify-stats';

export default function (WEBPACK_HOST, WEBPACK_PORT) {
    return {
        devtool: 'eval',
        debug: true,
        entry: {
            main: [
                `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
                `webpack/hot/dev-server`,
                './app/init.js',
            ],
        },
        output: {
            path: path.resolve(__dirname, './public'),
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[hash].js',
            publicPath: `http://${WEBPACK_HOST}:${WEBPACK_PORT}/assets/`,
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        plugins: [
                              ['react-transform', {
                                  transforms: [
                                      {
                                          transform: 'react-transform-hmr',
                                          imports: ['react'],
                                          locals: ['module'],
                                      }, {
                                          transform: 'react-transform-catch-errors',
                                          imports: ['react', 'redbox-react'],
                                      },
                                  ],
                              }],
                        ],
                    },
                },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.sass$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax=sass' },
                { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
            ],
        },
        postcss: [autoprefixer({ browsers: ['last 2 version'] }), cssmqpacker],
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.ProgressPlugin((percentage, message) => {
                const MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
                const CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
                process.stdout.write(`${CLEAR_LINE}${Math.round(percentage * 100)}%: ${message}${MOVE_LEFT}`);
            }),
            function stats() {
                this.plugin('done', notifyStats);
            },
            new AssetsPlugin({
                filename: 'webpack-stats.json',
                path: path.join(__dirname, '..', 'app', 'bundles'),
            }),
        ],
    };
}
