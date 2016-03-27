import path from 'path';
import Koa from 'koa';
import chalk from 'chalk';
import compress from 'koa-compress';
import serveStatic from 'koa-static';
import devEnv from '../config/dev-environment';

const app = new Koa();
const port = devEnv.backendPort || 9000;

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        this.status = err.statusCode || err.status || 500;
        this.body = {
            message: err.message,
        };
    }
});

app.use(serveStatic(path.join(__dirname, "..", "public")));
app.use(serveStatic(path.join(__dirname, "..", "app")));

app.use(compress({
    flush: require('zlib').Z_SYNC_FLUSH,
}));

app.listen(port, err => {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(`${chalk.yellow(`backend server`)} listening on ${chalk.yellow(` ~> ${port}`)}`);
    }
});
