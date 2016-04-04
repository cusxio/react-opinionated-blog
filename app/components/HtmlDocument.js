import React, { PropTypes } from 'react';

const propTypes = {
    assets: PropTypes.object,
    markup: PropTypes.string,
    head: PropTypes.object,
};

const HtmlDocument = ({ assets, markup, head }) => (
    <html lang="en" className="no-js">
        <head>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href={assets.css} />
            {/* Social */}
            {head.meta}
            {head.title}
        </head>
        <body>
            {/* eslint-disable */}
            <div id="app" dangerouslySetInnerHTML={{ __html: markup }}></div>
            {/* eslint-enable */}
            <script src={assets.js}></script>
        </body>
    </html>
);

HtmlDocument.propTypes = propTypes;

export default HtmlDocument;
