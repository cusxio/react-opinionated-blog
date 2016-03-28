import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';
import Parser from '../components/Parser';

const routes = (
    <Route component={App}>
        <Route path="*" component={Parser} />
    </Route>
);

export default routes;
