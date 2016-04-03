import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import * as ActionTypes from '../redux/actions';

const splatToUrl = string => (`/${string}`);
const canGetPage = route => {
    return Boolean(route !== '/' && route !== '/blog');
};

let _catchLinks;

if (canUseDOM) {
    _catchLinks = require('../utils/catch-links').default;
}

const contextTypes = {
    layouts: PropTypes.object,
    pages: PropTypes.object,
    router: PropTypes.object,
};

const propTypes = {
    params: PropTypes.object,
    page: PropTypes.object,
};

class Parser extends Component {
    componentWillMount() {
        const route = splatToUrl(this.props.params.splat);
        if (canGetPage(route)) {
            this.getPage(this.props, this.context);
        }
    }
    componentWillReceiveProps(nextProps) {
        const route = splatToUrl(nextProps.params.splat);
        if (canGetPage(route)) {
            this.getPage(nextProps, this.context);
        }
    }
    componentDidUpdate() {
        this.catchLinks();
    }
    componentDidMount() {
        this.catchLinks();
    }
    getPage(props, context) {
        const route = splatToUrl(props.params.splat);
        const pageInContext = context.pages[route];
        if (canUseDOM && pageInContext) {
            const currentExactPageUrl = window.location.href
            .replace((window.location.protocol + "//" + window.location.host), "")
            .replace(window.location.hash, "");
            if (currentExactPageUrl !== route) {
                if (context.router) {
                    context.router.replace(pageInContext.__ROUTE__);
                }
            }
        }
        const page = props.page;
        if (!page || page.__ROUTE__ !== pageInContext.__ROUTE__) {
            if (pageInContext) {
                props.getPage(pageInContext.__ROUTE__);
            }
        }
    }
    getLayout(props, context) {
        const route = splatToUrl(props.params.splat);
        if (canGetPage(route)) {
            return context.layouts.Post;
        } else if (route === '/') {
            return context.layouts.Home;
        } else if (route === '/blog') {
            return context.layouts.Blog;
        }
    }
    catchLinks() {
        if (!canUseDOM) {
            return;
        }
        if (this._component) {
            const node = findDOMNode(this._component);
            if (node) {
                _catchLinks(node, href => {
                    const route = href;
                    const pageInContext = this.context.pages[route];
                    if (!pageInContext) {
                        return false;
                    }
                    if (this.context.router) {
                        this.context.router.push(route);
                    }
                    return true;
                });
            }
        }
    }
    render() {
        const page = this.props.page;
        const Layout = this.getLayout(this.props, this.context);
        return (
            <Layout ref={ref => (this._component = ref)} {...page} pages={this.context.pages} />
        );
    }
}

Parser.contextTypes = contextTypes;
Parser.propTypes = propTypes;

export default connect(
    ({ page }) => {
        return {
            page,
        };
    }, dispatch => {
    return {
        getPage: (...args) => {
            dispatch(ActionTypes.getPage(...args));
        },
    };
})(Parser);
