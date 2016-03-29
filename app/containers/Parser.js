import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../redux/actions';

const splatToUrl = string => (`/${string}`);

const contextTypes = {
    layouts: PropTypes.object,
};

class Parser extends Component {
    render() {
        // const route = splatToUrl(this.props.params.splat);
        const Layout = this.context.layouts.Blog;
        return (
            <Layout />
        );
    }
}

Parser.contextTypes = contextTypes;

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
