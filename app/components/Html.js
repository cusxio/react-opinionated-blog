import React, { PropTypes } from 'react';

const propTypes = {
    assets: PropTypes.object,
    markup: PropTypes.string,
    head: PropTypes.object,
};

const Html = ({ assets, markup, head }) => (
    <html lang="en" className="no-js">
        <head>
            <meta charSet="UTF-8" />
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

Html.propTypes = propTypes;

export default Html;
