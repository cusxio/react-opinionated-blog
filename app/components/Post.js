import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Footer from './Footer';

const contextTypes = {
    router: PropTypes.object,
};

export default class Post extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.context.router.goBack();
    }
    genTag(tagsArr) {
        const tag = tagsArr[0];
        if (tag === 'Development') {
            return 'DEV';
        } else if (tag === 'JavaScript') {
            return 'JS';
        }
        return tag.toUpperCase();
    }
    render() {
        const post = this.props;
        const meta = [
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: post.__TITLE__ },
            { property: 'og:url', content: `http://cusx.io${post.__ROUTE__}` },
            { property: 'og:description', content: post.__DESC__ },
            // { property: 'og:image', content: 'http://someurl.com/pic.png' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: post.__TITLE__ },
            { name: 'twitter:creator', content: '@cusxio' },
            { name: 'twitter:description', content: post.__DESC__ },
            { name: 'twitter:image', content: `http://cusx.io${post.__ROUTE__}` },
            { name: 'description', content: post.__DESC__ },
        ];
        return (
            <div className="one__container">
                <div className="blog__post">
                    <Helmet
                        title={`cusx.io | ${post.__TITLE__}`}
                        meta={meta}
                    />
                    <a onClick={this.handleClick} className="post--back" href="/blog"><i className="ion-arrow-left-c"></i> BACK TO BLOG</a>
                    <div className="post--tags">
                    {this.genTag(post.__TAGS__)}
                    </div>
                    <div className="post--header">
                        <h1>
                            <a to={post.__ROUTE__}>{post.__TITLE__}</a>
                        </h1>
                        <p>Jonathan Chan &middot; {post.__DATE__}</p>
                    </div>
                    {/* eslint-disable */}
                    <div className="cus post--content" dangerouslySetInnerHTML={{ __html: post.__HTML__ }}></div>
                    {/* eslint-enable */}
                    <div className="social">
                        <a data-tooltip="Share on Twitter" data-tooltip-pos="down" href={`https://twitter.com/intent/tweet?url=https://cusx.io${post.__ROUTE__}&text=${post.__DESC__}&via=cusxio`} target="share">
                            <i className="ion-social-twitter"></i>
                        </a>
                        <a data-tooltip="Share on Facebook" data-tooltip-pos="down" href={`https://www.facebook.com/sharer/sharer.php?u=http://cusx.io${post.__ROUTE__}`} target="share">
                            <i className="ion-social-facebook"></i>
                        </a>
                        <a data-tooltip="Share on Google Plus" data-tooltip-pos="down" href={`https://plus.google.com/share?url=http://cusx.io${post.__ROUTE__}`} target="share">
                            <i className="ion-social-googleplus"></i>
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

Post.contextTypes = contextTypes;

export default Post;
