import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import Modernizr from 'modernizr';

let browserInteraction = (ComposedComponent, screenSize, hoverClass, scrollClass) => class extends Component {
    constructor() {
        super();
        this._onResize = this._onResize.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }
    _hoverThrottle() {
        debounce(function () {
            document.body.classList.add(hoverClass);
        }, 100)();
    }
    _scrollThrottle() {
        throttle(function () {
            document.body.scrollTop > 0.15 * window.innerHeight ? document.body.classList.add(scrollClass) : document.body.classList.remove(scrollClass);
        }, 100).bind(this)();
    }
    _resizeThrottle() {
        let currentScreenSize = window.innerWidth < screenSize;
        throttle(function () {
            window.innerWidth < screenSize && !currentScreenSize ? currentScreenSize = !0 : window.innerWidth > screenSize - 1 && currentScreenSize && (currentScreenSize = !1);
        }, 100).bind(this)();
    }
    _scrollActions() {
        document.body.classList.add(hoverClass);
        window.addEventListener('scroll', this._onScroll);
    }
    _onScroll() {
        document.body.classList.contains(hoverClass) && document.body.classList.remove(hoverClass);
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
        return <ComposedComponent {...this.props} />;
    }
};

export default browserInteraction;
