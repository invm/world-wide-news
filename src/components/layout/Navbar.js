import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className='fas fa-globe'></i>
        World Wide News
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <a href='https://github.com/invm/world-wide-news'>
            <i className='fab fa-github fa-2x'></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
