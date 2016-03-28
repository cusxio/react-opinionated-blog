import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';
import Index from '../components/Index';

const routes = (
    <Route component={App}>
        <Route path="*" component={Index} />
    </Route>
);

export default routes;
