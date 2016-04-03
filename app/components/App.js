import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import Modernizr from 'modernizr';

const propTypes = {
    children: PropTypes.element.isRequired,
};

const meta = [
    { name: 'twitter:site', content: '@cusxio' },
    { name: 'author', content: 'Jonathan Chan' },
    { property: 'og:site_name', content: 'cusx.io' },
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._onResize = this._onResize.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }
    _hoverThrottle() {
        debounce(function () {
            document.body.classList.add('h');
        }, 100)();
    }
    _scrollThrottle() {
        throttle(function () {
            document.body.scrollTop > 0.15 * window.innerHeight ? document.body.classList.add('s') : document.body.classList.remove('s');
        }, 100).bind(this)();
    }
    _resizeThrottle() {
        let current1200 = window.innerWidth < 1200;
        throttle(function () {
            window.innerWidth < 1200 && !current1200 ? current1200 = !0 : window.innerWidth > 1200 - 1 && current1200 && (current1200 = !1);
        }, 100).bind(this)();
    }
    _scrollActions() {
        document.body.classList.add('h');
        window.addEventListener('scroll', this._onScroll);
    }
    _onScroll() {
        document.body.classList.contains('h') && document.body.classList.remove('h');
        this._hoverThrottle();
        this._scrollThrottle();
    }
    _resizeActions() {
        window.addEventListener('resize', this._onResize);
    }
    _onResize() {
        this._resizeThrottle();
    }
    componentDidMount() {
        let touchEvent = Modernizr.touchevents;
        touchEvent || this._scrollActions();
        this._resizeActions();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScroll);
        window.removeEventListener('resize', this._onResize);
    }
    render() {
        return (
            <div>
                <Helmet
                    meta={meta}
                />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = propTypes;
