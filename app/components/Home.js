import React, { Component } from 'react';
import { Link } from 'react-router';
import debounce from 'lodash/debounce';
import Helmet from 'react-helmet';

export default class Home extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.changeTooltip = debounce(this.changeTooltip, 500);
    }
    handleClick(e) {
        e.preventDefault();
        clearTimeout(this.timer);
        const node = this._input;
        node.style.display = "block";
        node.select();
        try {
            document.execCommand('copy');
            node.style.display = "none";
            e.currentTarget.dataset.tooltip = 'Copied !';
        } catch (err) {
        }
    }
    handleMouseLeave(e) {
        this.changeTooltip(e.currentTarget);
    }
    changeTooltip(target) {
        target.dataset.tooltip = 'Copy email';
    }
    render() {
        const meta = [
            { name: 'description', content: 'cusx.io - Website for Jonathan Chan' },
        ];
        const link = [
            { rel: 'canonical', href: 'https://cusx.io/' },
        ];
        return (
            <div className="home">
                <Helmet
                    title="cusx.io | Home"
                    meta={meta}
                    link={link}
                />
                <div className="home__logo">
                    <div className="box one">
                        <div className="center-align-1">
                            <div className="center-align-2">C</div>
                        </div>
                    </div>
                    <div className="box two">
                        <div className="center-align-1">
                            <div className="center-align-2">S</div>
                        </div>
                    </div>
                    <div className="box three">
                        <div className="center-align-1">
                            <div className="center-align-2">U</div>
                        </div>
                    </div>
                    <div className="box four">
                        <div className="center-align-1">
                            <div className="center-align-2">X</div>
                        </div>
                    </div>
                </div>
                <div className="home__text">
                    <h1 className="name">Jonathan Chan</h1>
                    <div className="desc">
                        <h2>
                            <span>Web Developer </span><i className="ion-android-favorite"></i> <span>&middot; </span>
                            <span>Chemical Engineer </span><i className="ion-university"></i>
                        </h2>
                        <h2></h2>
                    </div>
                    <h3 className="location">From Malaysia</h3>
                </div>
                <div className="home__link">
                    <a href="https://twitter.com/cusxio"><i className="ion-social-twitter"></i></a>
                    <a href="https://github.com/cusxio"><i className="ion-social-octocat"></i></a>
                    <a href="https://www.linkedin.com/in/cusxio"><i className="ion-social-linkedin"></i></a>
                    <Link to="/blog/"><i className="ion-waterdrop"></i></Link>
                    <a onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} data-tooltip="Copy email" data-tooltip-pos="down" href="mailto:cus@cusx.io"><i className="ion-email"></i></a>
                    <input ref={ref => (this._input = ref)} type="text" defaultValue="cus@cusx.io" style={{ display: "none", position: "absolute", left: "1000px" }} />
                </div>
                <div className="home__copyright">&copy; cusx.io 2016</div>
            </div>
        );
    }
}
