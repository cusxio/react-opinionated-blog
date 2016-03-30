import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../redux/actions';

const splatToUrl = string => (`/${string}`);
const canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
const canGetPage = route => {
    return Boolean(route !== '/' && route !== '/blog');
};

const contextTypes = {
    layouts: PropTypes.object,
    pages: PropTypes.object,
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
        const route = splatToUrl(this.props.params.splat);
        if (canGetPage(route)) {
            this.getPage(nextProps, this.context);
        }
    }
    getPage(props, context) {
        const route = splatToUrl(props.params.splat);
        const pageInContext = context.pages[route];
        if (canUseDOM && pageInContext) {
            const currentExactPageUrl = window.location.href
            .replace((window.location.protocol + "//" + window.location.host), "")
            .replace(window.location.hash, "");
            console.log(currentExactPageUrl);

            if (currentExactPageUrl !== route) {
                if (props.history) {
                    props.history.replace(pageInContext.__ROUTE__);
                }
            }
        }
        const page = props.page;
        if (!page) {
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
    render() {
        const page = this.props.page;
        const Layout = this.getLayout(this.props, this.context);
        return (
            <Layout {...page} />
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
