import path from 'path';
import Koa from 'koa';
import chalk from 'chalk';
import compress from 'koa-compress';
import serveStatic from 'koa-static';
import devEnv from '../config/dev-environment';
import render from './render';

const app = new Koa();
const KOA_HOST = process.env.HOST || '0.0.0.0';
const KOA_PORT = process.env.PORT || devEnv.backendPort;

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});

app.use(serveStatic(path.join(__dirname, "..", "public")));
app.use(serveStatic(path.join(__dirname, "..", "app")));

app.use(render);
app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH,
}));

app.listen(KOA_PORT, KOA_HOST, err => {
    if (err) {
        console.log(chalk.red(err));
    } else {
        const url = `http://${KOA_HOST}:${KOA_PORT}`;
        console.log(`${chalk.yellow(`backend server`)} listening on ${chalk.yellow(url)}`);
    }
});
