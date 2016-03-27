import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import getAssetsPaths from '../webpack/utils/assets-path';
import Html from '../app/components/html';
// todo: routes
import routes from '../some/path';

export async function render(ctx, next) {
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
            const markup = renderToString(<RouterContext {...renderProps} />);
            const assets = getAssetsPaths();
            const html = renderToStaticMarkup(
                <Html
                    markup={markup}
                    assets={assets}
                />
            );
            const doctype = '<!DOCTYPE html>';
            ctx.body = doctype + html;
        }
    });
}
