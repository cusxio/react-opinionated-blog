import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const propTypes = {
    children: PropTypes.element.isRequired,
};

const meta = [
    { name: 'twitter:site', content: '@cusxio' },
    { name: 'author', content: 'Jonathan Chan' },
    { property: 'og:site_name', content: 'cusx.io' },
];

const App = ({ children }) => (
    <div>
        <Helmet
            meta={meta}
        />
        {children}
    </div>
);

App.propTypes = propTypes;

export default App;
