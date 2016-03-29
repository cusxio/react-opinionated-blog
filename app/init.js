import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import pagesfromJson from '../_tmp/data.json';
import ContextProvider from './containers/ContextProvider';
import configureStore from './redux/store';
import routes from './router/routes';

import Home from './components/Home';
import Blog from './components/Blog';
import Post from './components/Post';

const layouts = {
    Home,
    Blog,
    Post,
};

const store = configureStore();

const clientSide = (
    <ContextProvider pages={pagesfromJson} layouts={layouts}>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </ContextProvider>
);

render(clientSide, document.getElementById('app'));
