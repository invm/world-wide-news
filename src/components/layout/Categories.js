import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className='categories'>
      <ul>
        <li>
          <Link to='/business/'>Business</Link>
        </li>
        <li>
          <Link to='/sports/'>Sports</Link>
        </li>
        <li>
          <Link to='/entertainment/'>Entertainment</Link>
        </li>
        <li>
          <Link to='/technology/'>Technology</Link>
        </li>
        <li>
          <Link to='/health/'>Health</Link>
        </li>
        <li>
          <Link to='/science/'>Science</Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
