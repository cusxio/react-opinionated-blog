import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';
import Parser from '../containers/Parser';
import browserInteraction from '../containers/browserInteraction';

const routes = (
    <Route component={browserInteraction(App, 1200, 'h', 's')}>
        <Route path="*" component={Parser} />
    </Route>
);

export default routes;
