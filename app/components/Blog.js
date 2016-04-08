import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Footer from './Footer';

const propTypes = {
    pages: PropTypes.object,
};

export default class Blog extends Component {
    genList(arr) {
        return arr.map(i => {
            return (
                <Link key={i.__SDATE__} to={i.__ROUTE__}>
                    <span>{i.__SDATE__}</span>
                    <span>{i.__TITLE__}</span>
                    <span>{i.__TAGS__.join(', ')}</span>
                </Link>
            );
        });
    }
    render() {
        const pages = this.props.pages;
        const pagesArr = Object.keys(pages).map(key => pages[key]).reverse();
        const mostRecent = pagesArr[0];
        const nextPost = pagesArr[1];
        const meta = [
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: mostRecent.__TITLE__ },
            { property: 'og:url', content: `https://cusx.io${mostRecent.__ROUTE__}` },
            { property: 'og:description', content: mostRecent.__DESC__ },
            // { property: 'og:image', content: 'http://someurl.com/pic.png' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: mostRecent.__TITLE__ },
            { name: 'twitter:creator', content: '@cusxio' },
            { name: 'twitter:description', content: mostRecent.__DESC__ },
            { name: 'twitter:image', content: `https://cusx.io${mostRecent.__ROUTE__}` },
            { name: 'description', content: mostRecent.__DESC__ },
        ];
        const link = [
            { rel: 'canonical', href: 'https://cusx.io/blog/' },
        ];
        return (
            <div className="blog">
                <Helmet
                    title="cusx.io | Blog"
                    meta={meta}
                    link={link}
                />
                <div className="blog__header">
                    <h1>Droplets</h1>
                    <p>thoughts on life, work <span>and</span> tech</p>
                    <hr></hr>
                </div>
                <div className="blog__post">
                    <div className="post--header">
                        <h1>
                            <Link to={mostRecent.__ROUTE__} title={mostRecent.__TITLE__}>{mostRecent.__TITLE__}</Link>
                        </h1>
                        <p>Jonathan Chan &middot; {mostRecent.__DATE__}</p>
                    </div>
                    {/* eslint-disable */}
                    <div className="cus post--content" dangerouslySetInnerHTML={{ __html: mostRecent.__HTML__ }}></div>
                    {/* eslint-enable */}
                    <div className="social">
                        <a data-tooltip="Share on Twitter" data-tooltip-pos="down" href={`https://twitter.com/intent/tweet?url=https://cusx.io${mostRecent.__ROUTE__}&text=${mostRecent.__DESC__}&via=cusxio`} target="share">
                            <i className="ion-social-twitter"></i>
                        </a>
                        <a data-tooltip="Share on Facebook" data-tooltip-pos="down" href={`https://www.facebook.com/sharer/sharer.php?u=https://cusx.io${mostRecent.__ROUTE__}`} target="share">
                            <i className="ion-social-facebook"></i>
                        </a>
                        <a data-tooltip="Share on Google Plus" data-tooltip-pos="down" href={`https://plus.google.com/share?url=https://cusx.io${mostRecent.__ROUTE__}`} target="share">
                            <i className="ion-social-googleplus"></i>
                        </a>
                    </div>
                </div>
                <Link title={nextPost.__TITLE__} to={nextPost.__ROUTE__} className="blog__next">
                    <div className="post">
                        <span><i className="ion-waterdrop"></i>Previous Thoughts:</span>
                        <span>{nextPost.__TITLE__}</span>
                        <span>{nextPost.__DESC__}</span>
                        <span>READ</span>
                    </div>
                </Link>
                <div className="blog__more">
                    <div className="more">
                        <h1>Previous Thoughts: </h1>
                        {this.genList(pagesArr)}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

Blog.propTypes = propTypes;

export default Blog;
