import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
    <footer className="footer">
        <div className="footer__links">
            <Link to="/"><i className="ion-home"></i></Link>
            <a href="/blog/"><i className="ion-waterdrop"></i></a>
        </div>
        <div className="footer__copyright">© CUSX.IO 2016 — <a href="mailto:cus@cusx.io">cus@cusx.io</a></div>
        <div className="footer__designwithlove">Designed with Love. Open Sourced <a href="https://github.com/cusxio">@Github</a>.</div>
    </footer>
);

export default Footer;
