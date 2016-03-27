import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Index from '../components/Index';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
    </Route>
);

export default routes;
