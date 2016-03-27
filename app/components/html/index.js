import React, { Component, PropTypes } from 'react';

const propTypes = {
    assets: PropTypes.object,
    markup: PropTypes.string,
};

export default class Html extends Component {
    render() {
        const { assets, markup } = this.props;
        return (
            <html lang="en" className="no-js">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href={assets.css} />
                    {/* Open Graph Data */}
                    <meta property="og:url" content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content="When Great Minds Don’t Think Alike" />
                    <meta property="og:description" content="How much does culture influence creative thinking?" />
                    <meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
                    {/* Twitter Card Data */}
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@publisher_handle" />
                    <meta name="twitter:title" content="Page Title" />
                    <meta name="twitter:description" content="Page description less than 200 characters" />
                    <meta name="twitter:creator" content="@author_handle" />
                    {/* Site Data */}
                    <title>Reworking</title>
                    <meta name="description" content="Page description. No longer than 155 characters." />
                </head>
                <body>
                    {/* eslint-disable */}
                    <div id="app" dangerouslySetInnerHTML={{ __html: markup }}></div>
                    {/* eslint-enable */}
                    <script src={assets.js}></script>
                </body>
            </html>
        );
    }
}

Html.propTypes = propTypes;
