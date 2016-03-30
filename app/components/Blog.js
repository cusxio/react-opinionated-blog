import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
    pages: PropTypes.object,
};

const Blog = props => {
    const pages = props.pages;
    const pagesArr = Object.keys(pages).map(key => pages[key]).reverse();
    return (
        <div>
            <h1>Blog World !</h1>
             {pagesArr.map(page => {
                 return (
                     <Link key={page.__ROUTE__} to={page.__ROUTE__}>{page.__TITLE__}</Link>
                );
             })}
        </div>
    );
};

Blog.propTypes = propTypes;

export default Blog;
