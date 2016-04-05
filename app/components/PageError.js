import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const PageError = () => (
    <div className="error">
        <Helmet
            title="cusx.io | 404"
        />
        <div className="error__code">404</div>
        <div className="error__type">This link appears broken.</div>
        <pre>
            <code>
            {/* eslint-disable */}
{`
 　　＿＿＿_ ∧ ∧ 　　 ／￣￣￣￣￣￣￣|
～'　＿＿__(,,ﾟДﾟ) ＜    Err..     |
　　 ＵU 　 ＵU 　    ＼＿＿＿＿＿＿＿|
`}
            {/* eslint-enable */}
            </code>
        </pre>
        <p className="error__description">The page may have moved, or perhaps <br></br>
                    you mis-typed the address.
        </p>
        <div className="error__links">
            <Link to="/"><i className="ion-home"></i></Link>
            <a href="/blog"><i className="ion-waterdrop"></i></a>
        </div>
    </div>
);

export default PageError;
