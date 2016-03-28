import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import chalk from 'chalk';
import opn from 'opn';
import devEnv from '../config/dev-environment';
import devConfig from './dev.config';

const WEBPACK_HOST = process.env.HOST || '0.0.0.0';
const WEBPACK_PORT = process.env.PORT || devEnv.webpackPort;

const config = devConfig(WEBPACK_HOST, WEBPACK_PORT);

const proxyPath = 'http://0.0.0.0:' + devEnv.backendPort + '/';

const serverOptions = {
    contentBase: `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
    quiet: true,
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
    proxy: {
        '*': proxyPath,
    },
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, serverOptions);

server.listen(WEBPACK_PORT, WEBPACK_HOST, err => {
    if (err) {
        console.log(chalk.red(err));
    } else {
        const url = `http://${WEBPACK_HOST}:${WEBPACK_PORT}`;
        console.log(`${chalk.magenta(`webpack development server`)} listening on ${chalk.magenta(url)}`);
        opn(url);
    }
});
