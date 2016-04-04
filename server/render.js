import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../app/redux/store';

import getAssetsPaths from '../webpack/utils/assets-path';
import HtmlDocument from '../app/components/HtmlDocument';
import routes from '../app/router/routes';

import ContextProvider from '../app/containers/ContextProvider';
import Home from '../app/components/Home';
import Blog from '../app/components/Blog';
import Post from '../app/components/Post';

const layouts = {
    Home,
    Blog,
    Post,
};

const pagesfromJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_tmp', 'data.json'), 'utf-8'));

export default async function render(ctx, next) {
    const isHtml = ctx.headers.accept && ctx.accepts('html');

    if (!isHtml) {
        await next();
    }

    match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            ctx.status = 500;
            ctx.body = error.message;
        } else if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const initialState = {
                page: pagesfromJson[ctx.url],
            };
            const store = configureStore(initialState);

            const markup = renderToString(
                <ContextProvider layouts={layouts} pages={pagesfromJson}>
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                </ContextProvider>
                );
            const { title, meta } = Helmet.rewind();
            const head = {
                title: title.toComponent(),
                meta: meta.toComponent(),
            };
            const assets = getAssetsPaths();
            const html = renderToStaticMarkup(
                <HtmlDocument
                    head={head}
                    markup={markup}
                    assets={assets}
                />
            );
            const doctype = '<!DOCTYPE html>';
            ctx.body = doctype + html;
        }
    });
}
