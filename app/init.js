import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { Provider } from 'react-redux';
import pagesfromJson from '../_tmp/data.json';
import ContextProvider from './containers/ContextProvider';
import configureStore from './redux/store';
import routes from './router/routes';
import './css/style.sass';

import Home from './components/Home';
import Blog from './components/Blog';
import Post from './components/Post';

const layouts = {
    Home,
    Blog,
    Post,
};

const history = useScroll(useRouterHistory(createBrowserHistory))();

const store = configureStore();

const clientSide = (
    <ContextProvider pages={pagesfromJson} layouts={layouts}>
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    </ContextProvider>
);

render(clientSide, document.getElementById('app'));
