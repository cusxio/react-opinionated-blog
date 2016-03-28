import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Parser extends Component {
    render() {
        const meta = [
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: 'some title' },
            { property: 'og:url', content: 'http://someurl' },
            { property: 'og:description', content: 'some description' },
            { property: 'og:image', content: 'http://someurl.com/pic.png' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: 'some title' },
            { name: 'twitter:creator', content: 'twitter handler' },
            { name: 'twitter:description', content: 'some description' },
            { name: 'twitter:image', content: 'url' },
            { name: 'description', content: 'some description' },
        ];
        return (
            <div>
                <Helmet
                    title="Index"
                    meta={meta}
                />
                <h1>Hello World ! with meta tags.</h1>
            </div>
        );
    }
}

