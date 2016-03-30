import React from 'react';
import Helmet from 'react-helmet';

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

const Post = props => (
    <div>
        <Helmet
            title="Index"
            meta={meta}
        />
        <h1>{props.__TITLE__}</h1>
        <p>{props.__DATE__}</p>
        {/* eslint-disable */}
        <div dangerouslySetInnerHTML={{ __html: props.__HTML__ }}></div>
        {/* eslint-enable */}
    </div>
);

export default Post;
