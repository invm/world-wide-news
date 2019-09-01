import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className='categories'>
      <ul>
        <Link to='/business/'>
          <li>Business</li>
        </Link>
        <Link to='/sports/'>
          <li>Sports</li>
        </Link>
        <Link to='/entertainment/'>
          <li>Entertainment</li>
        </Link>
        <Link to='/technology/'>
          <li>Technology</li>
        </Link>
        <Link to='/health/'>
          <li>Health</li>
        </Link>
        <Link to='/science/'>
          <li>Science</li>
        </Link>
      </ul>
    </div>
  );
};

export default Categories;
