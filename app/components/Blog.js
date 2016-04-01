import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const propTypes = {
    pages: PropTypes.object,
};

export default class Blog extends Component {
    genList(arr) {
        return arr.map(i => {
            return (
                <Link key={i.__DATE__} to={i.__ROUTE__}>
                    <span>{i.__DATE__}</span>
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
        return (
            <div className="blog">
                <Helmet
                    title="cusx.io | Blog"
                />
                <div className="blog__header">
                    <h1>Droplets</h1>
                    <p>thoughts on life, work <span>and</span> tech</p>
                    <hr></hr>
                </div>
                <div className="blog__post">
                    <div className="post">
                        <div className="post--header">
                            <h1>
                                <Link to={mostRecent.__ROUTE__}>{mostRecent.__TITLE__}</Link>
                            </h1>
                            <p>Jonathan Chan &middot; {mostRecent.__DATE__}</p>
                        </div>
                        {/* eslint-disable */}
                        <div className="markdown-body post--content" dangerouslySetInnerHTML={{ __html: mostRecent.__HTML__ }}></div>
                        {/* eslint-enable */}
                    </div>
                </div>
                <Link to={nextPost.__ROUTE__} className="blog__next">
                    <div className="post">
                        <span>Previous Thoughts</span>
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
            </div>
        );
    }
}

Blog.propTypes = propTypes;

export default Blog;
