import React from 'react';
import { Link } from 'react-router';

const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to="/blog">to blog</Link>
    </div>
);

export default Home;
