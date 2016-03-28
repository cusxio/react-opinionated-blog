import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

const propTypes = {
    children: PropTypes.element.isRequired,
};

export default class App extends Component {
    render() {
        const { children } = this.props;
        const meta = [
            { name: 'twitter:site', content: '@cusxio' },
            { property: 'og:site_name', content: 'cusxio' },
        ];
        return (
            <div>
                <Helmet
                    meta={meta}
                />
                {children}
            </div>
        );
    }
}

App.propTypes = propTypes;
